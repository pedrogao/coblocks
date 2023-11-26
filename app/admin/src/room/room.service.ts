import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  ROOM_DOC_SERVICE_NAME,
  ROOM_HOOK_SERVICE_NAME,
  ROOM_METADATA_SERVICE_NAME,
  ROOM_SERVICE_NAME,
  RoomDocServiceClient,
  RoomHookServiceClient,
  RoomMetadataServiceClient,
  RoomServiceClient,
} from '@coblocks/proto';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { FindRoomDto } from './dto/find-room.dto';
import { FindManyDto } from './dto/find-many.dto';
import { RoomStatus } from '@coblocks/common';
import { emptyDoc } from 'src/doc';

@Injectable()
export class RoomService implements OnModuleInit {
  private roomClient: RoomServiceClient;
  private roomDocClient: RoomDocServiceClient;
  private roomHookClient: RoomHookServiceClient;
  private roomMetadataClient: RoomMetadataServiceClient;

  constructor(@Inject('room') private client: ClientGrpc) {}

  onModuleInit() {
    this.roomClient = this.client.getService<RoomServiceClient>(ROOM_SERVICE_NAME);
    this.roomDocClient = this.client.getService<RoomDocServiceClient>(ROOM_DOC_SERVICE_NAME);
    this.roomHookClient = this.client.getService<RoomHookServiceClient>(ROOM_HOOK_SERVICE_NAME);
    this.roomMetadataClient = this.client.getService<RoomMetadataServiceClient>(
      ROOM_METADATA_SERVICE_NAME,
    );
  }

  async create(createRoomDto: CreateRoomDto, creatorId: string) {
    const resp = await this.roomClient
      .createRoom({
        name: createRoomDto.name,
        projectId: createRoomDto.projectId,
        creatorId,
        status: createRoomDto.status === 'Opened' ? RoomStatus.Opened : RoomStatus.Closed,
      })
      .toPromise();

    const roomDoc = await this.roomDocClient
      .createRoomDoc({
        doc: emptyDoc(),
        creatorId,
        roomId: resp.id,
      })
      .toPromise();

    const roomMetadata = await this.roomMetadataClient
      .createRoomMetadata({
        creatorId,
        roomId: resp.id,
        metadata: JSON.stringify({}),
      })
      .toPromise();

    return {
      id: resp.id,
      name: resp.name,
      projectId: resp.projectId,
      status: resp.status === RoomStatus.Opened ? 'Opened' : 'Closed',
      metadata: roomMetadata.metadata,
      doc: roomDoc.doc,
      hooks: [],
    };
  }

  async findMany(query: FindRoomDto, creatorId: string) {
    const param = FindManyDto.fromFindRoomDto(query);

    const resp = await this.roomClient
      .findRoomList({
        limit: param.limit,
        offset: param.offset,
        creatorId,
        s: param.s,
        sorters: param.sort,
      })
      .toPromise();

    return {
      data:
        resp.data?.map((project) => {
          return {
            id: project.id,
            name: project.name,
            projectId: project.projectId,
            status: project.status === RoomStatus.Opened ? 'Opened' : 'Closed',
            creatorId: project.creatorId,
          };
        }) || [],
      total: resp.total,
      count: query.limit,
      page: Math.ceil(query.offset / query.limit) + 1,
      pageCount: Math.ceil(resp.total / query.limit),
    };
  }

  async findOne(id: string) {
    const resp = await this.roomClient
      .findRoom({
        id,
      })
      .toPromise();

    const roomDoc = await this.roomDocClient.getRoomDoc({ roomId: id }).toPromise();
    // TODO: limit & offset
    const roomHook = await this.roomHookClient
      .findRoomHookList({ roomId: id, limit: 10, offset: 0 })
      .toPromise();
    const roomMetadata = await this.roomMetadataClient.getRoomMetadata({ roomId: id }).toPromise();

    return {
      id: resp.id,
      name: resp.name,
      projectId: resp.projectId,
      status: resp.status === RoomStatus.Opened ? 'Opened' : 'Closed',
      creatorId: resp.creatorId,
      doc: roomDoc.doc,
      metadata: roomMetadata.metadata,
      hooks: roomHook.data,
    };
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    const resp = await this.roomClient
      .updateRoom({
        id,
        status: updateRoomDto.status === 'Opened' ? RoomStatus.Opened : RoomStatus.Closed,
      })
      .toPromise();

    return {
      id: resp.id,
      name: resp.name,
      projectId: resp.projectId,
      status: resp.status === RoomStatus.Opened ? 'Opened' : 'Closed',
      creatorId: resp.creatorId,
    };
  }

  async remove(id: string) {
    await this.roomClient.deleteRoom({ id }).toPromise();

    return {
      message: 'ok',
    };
  }
}
