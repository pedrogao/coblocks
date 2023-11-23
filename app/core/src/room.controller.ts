import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import {
  RoomServiceController,
  ROOM_SERVICE_NAME,
  RoomServiceControllerMethods,
  CreateRoomRequest,
  FindRoomListRequest,
  FindRoomListResponse,
  Room,
  UpdateRoomRequest,
} from '@coblocks/proto';
import { RoomService } from './dao/room.service';

@Controller()
@RoomServiceControllerMethods()
export class RoomController implements RoomServiceController {
  constructor(private roomService: RoomService) {}

  @GrpcMethod(ROOM_SERVICE_NAME, 'findRoomList')
  async findRoomList(
    request: FindRoomListRequest,
    metadata?: Metadata,
  ): Promise<FindRoomListResponse> {
    const contidion = {
      limit: request.limit,
      offset: request.offset,
      creatorId: Number(request.creatorId),
    } as any;
    if (request.projectId) {
      contidion.projectId = Number(request.projectId);
    }
    const { rooms, total } = await this.roomService.findRoomList(contidion);

    return {
      count: request.limit,
      page: Math.ceil(request.offset / request.limit) + 1,
      total,
      pageCount: Math.ceil(total / request.limit),
      data: rooms.map((room) => {
        return {
          id: Number(room.id),
          name: room.name,
          projectId: Number(room.project_id),
          creatorId: Number(room.creator_id),
          status: room.status ? 1 : 0,
        };
      }),
    };
  }

  @GrpcMethod(ROOM_SERVICE_NAME, 'createRoom')
  async createRoom(request: CreateRoomRequest, metadata?: Metadata): Promise<Room> {
    return this.roomService
      .createRoom({
        name: request.name,
        projectId: request.projectId,
        creatorId: request.creatorId,
        status: request.status === 1,
      })
      .then((room) => {
        return {
          id: Number(room.id),
          name: room.name,
          projectId: Number(room.project_id),
          creatorId: Number(room.creator_id),
          status: room.status ? 1 : 0,
        };
      });
  }

  @GrpcMethod(ROOM_SERVICE_NAME, 'updateRoom')
  async updateRoom(request: UpdateRoomRequest, metadata?: Metadata): Promise<Room> {
    return this.roomService
      .updateRoom({
        id: request.id,
        status: request.status === 1,
      })
      .then((room) => {
        return {
          id: Number(room.id),
          name: room.name,
          projectId: Number(room.project_id),
          creatorId: Number(room.creator_id),
          status: room.status ? 1 : 0,
        };
      });
  }
}
