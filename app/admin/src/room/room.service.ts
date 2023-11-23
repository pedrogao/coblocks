import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ROOM_SERVICE_NAME, RoomServiceClient } from '@coblocks/proto';
import { ClientGrpc } from '@nestjs/microservices';
import { FindRoomDto } from './dto/find-room.dto';

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
    const resp = await this.roomClient
      .findRoomList({
        projectId: query.projectId,
        limit: query.limit,
        offset: query.offset,
        creatorId,
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
