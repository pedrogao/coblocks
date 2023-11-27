import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  RoomServiceController,
  ROOM_SERVICE_NAME,
  RoomServiceControllerMethods,
  CreateRoomRequest,
  FindRoomListRequest,
  FindRoomListResponse,
  Room,
  UpdateRoomRequest,
  DeleteRoomRequest,
  FindRoomRequest,
  VoidResponse,
  FindRoomByNameRequest,
} from '@coblocks/proto';
import { RoomService } from './room.service';
import { RoomStatus } from '@coblocks/common';

@Controller()
@RoomServiceControllerMethods()
export class RoomController implements RoomServiceController {
  private readonly logger = new Logger(RoomController.name);

  constructor(private roomService: RoomService) {}

  @GrpcMethod(ROOM_SERVICE_NAME, 'findRoom')
  async findRoom(request: FindRoomRequest): Promise<Room> {
    const room = await this.roomService.findRoom(request.id);

    return {
      id: room.id.toString(),
      name: room.name,
      projectId: room.project_id.toString(),
      creatorId: room.creator_id.toString(),
      status: room.status ? RoomStatus.Opened : RoomStatus.Closed,
    };
  }

  async findRoomByName(request: FindRoomByNameRequest): Promise<Room> {
    const room = await this.roomService.findRoomByName(request.name);

    return {
      id: room.id.toString(),
      name: room.name,
      projectId: room.project_id.toString(),
      creatorId: room.creator_id.toString(),
      status: room.status ? RoomStatus.Opened : RoomStatus.Closed,
    };
  }

  @GrpcMethod(ROOM_SERVICE_NAME, 'deleteRoom')
  async deleteRoom(request: DeleteRoomRequest): Promise<VoidResponse> {
    try {
      await this.roomService.deleteRoom(request.id);
      return {
        ok: true,
        error: '',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        ok: false,
        error: error.message,
      };
    }
  }

  @GrpcMethod(ROOM_SERVICE_NAME, 'findRoomList')
  async findRoomList(request: FindRoomListRequest): Promise<FindRoomListResponse> {
    const { rooms, total } = await this.roomService.findRoomList(request);

    return {
      total,
      data: rooms.map((room) => {
        return {
          id: room.id.toString(),
          name: room.name,
          projectId: room.project_id.toString(),
          creatorId: room.creator_id.toString(),
          status: room.status ? RoomStatus.Opened : RoomStatus.Closed,
        };
      }),
    };
  }

  @GrpcMethod(ROOM_SERVICE_NAME, 'createRoom')
  async createRoom(request: CreateRoomRequest): Promise<Room> {
    return this.roomService
      .createRoom({
        name: request.name,
        projectId: request.projectId,
        creatorId: request.creatorId,
        status: request.status === RoomStatus.Opened,
      })
      .then((room) => {
        return {
          id: room.id.toString(),
          name: room.name,
          projectId: room.project_id.toString(),
          creatorId: room.creator_id.toString(),
          status: room.status ? RoomStatus.Opened : RoomStatus.Closed,
        };
      });
  }

  @GrpcMethod(ROOM_SERVICE_NAME, 'updateRoom')
  async updateRoom(request: UpdateRoomRequest): Promise<Room> {
    return this.roomService
      .updateRoom({
        id: request.id,
        status: request.status === RoomStatus.Opened,
      })
      .then((room) => {
        return {
          id: room.id.toString(),
          name: room.name,
          projectId: room.project_id.toString(),
          creatorId: room.creator_id.toString(),
          status: room.status ? RoomStatus.Opened : RoomStatus.Closed,
        };
      });
  }
}
