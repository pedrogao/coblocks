import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ROOM_SERVICE_NAME, RoomServiceClient } from '@coblocks/proto';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { FindRoomDto } from './dto/find-room.dto';
import { FindManyDto } from './dto/find-many.dto';

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

  async findMany(query: FindRoomDto, creatorId: number) {
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

    if (resp.data && resp.data.length > 0) {
      resp.data = resp.data.map((project) => {
        return {
          id: Number(project.id),
          name: project.name,
          projectId: Number(project.projectId),
          status: project.status,
          creatorId: Number(project.creatorId),
        };
      });
    }

    return resp;
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
