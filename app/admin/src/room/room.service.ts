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

  async create(createRoomDto: CreateRoomDto) {
    return 'This action adds a new room';
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
      data: resp.data.map((project) => {
        return {
          id: project.id,
          name: project.name,
          projectId: project.projectId,
          status: project.status === RoomStatus.Opened ? 'Opened' : 'Closed',
          creatorId: project.creatorId,
        };
      }),
      total: resp.total,
      count: query.limit,
      page: Math.ceil(query.offset / query.limit) + 1,
      pageCount: Math.ceil(resp.total / query.limit),
    };
  }

  async findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  async remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
