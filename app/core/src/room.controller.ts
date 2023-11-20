import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
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
  findRoomList(
    request: FindRoomListRequest,
    metadata?: Metadata,
  ): FindRoomListResponse | Promise<FindRoomListResponse> | Observable<FindRoomListResponse> {
    return this.roomService.findRoomList(Number(request.creatorId)).then((rooms) => {
      return {
        rooms: rooms.map((room) => {
          return {
            id: Number(room.id),
            name: room.name,
            projectId: Number(room.project_id),
            creatorId: Number(room.creator_id),
            status: room.status ? 1 : 0,
          };
        }),
      };
    });
  }

  @GrpcMethod(ROOM_SERVICE_NAME, 'createRoom')
  createRoom(
    request: CreateRoomRequest,
    metadata?: Metadata,
  ): Room | Promise<Room> | Observable<Room> {
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
  updateRoom(
    request: UpdateRoomRequest,
    metadata?: Metadata,
  ): Room | Promise<Room> | Observable<Room> {
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
