import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ROOM_SERVICE_NAME, RoomServiceClient } from '@coblocks/proto';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { FindRoomDto } from './dto/find-room.dto';
import { FindManyDto } from './dto/find-many.dto';
import { RoomStatus } from '@coblocks/common';

@Injectable()
export class RoomService implements OnModuleInit {
  private roomClient: RoomServiceClient;

  constructor(@Inject('room') private client: ClientGrpc) {}

  onModuleInit() {
    this.roomClient = this.client.getService<RoomServiceClient>(ROOM_SERVICE_NAME);
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

    return {
      id: resp.id,
      name: resp.name,
      projectId: resp.projectId,
      status: resp.status === RoomStatus.Opened ? 'Opened' : 'Closed',
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

    return {
      id: resp.id,
      name: resp.name,
      projectId: resp.projectId,
      status: resp.status === RoomStatus.Opened ? 'Opened' : 'Closed',
      creatorId: resp.creatorId,
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
