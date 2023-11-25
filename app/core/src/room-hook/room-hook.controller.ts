import { Controller, Logger } from '@nestjs/common';
import { RoomHookService } from './room-hook.service';
import {
  CreateRoomHookRequest,
  DeleteRoomHookRequest,
  FindRoomHookListRequest,
  FindRoomHookListResponse,
  ROOM_HOOK_SERVICE_NAME,
  RoomHook,
  RoomHookServiceController,
  RoomHookServiceControllerMethods,
  UpdateRoomHookRequest,
  VoidResponse,
} from '@coblocks/proto';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
@RoomHookServiceControllerMethods()
export class RoomHookController implements RoomHookServiceController {
  private readonly logger = new Logger(RoomHookController.name);

  constructor(private readonly roomHookService: RoomHookService) {}

  @GrpcMethod(ROOM_HOOK_SERVICE_NAME, 'createRoomHook')
  async createRoomHook(request: CreateRoomHookRequest): Promise<RoomHook> {
    const hook = await this.roomHookService.createRoomHook(request);
    return {
      id: hook.id.toString(),
      roomId: hook.room_id.toString(),
      url: hook.url,
      method: hook.method,
      header: hook.header.toString(),
      body: hook.body.toString(),
      type: hook.type,
      createdTime: hook.create_time.toString(),
      updatedTime: hook.update_time.toString(),
      creatorId: hook.creator_id.toString(),
    };
  }

  @GrpcMethod(ROOM_HOOK_SERVICE_NAME, 'findRoomHookList')
  async findRoomHookList(request: FindRoomHookListRequest): Promise<FindRoomHookListResponse> {
    const { data, total } = await this.roomHookService.findRoomHookList(request);
    return {
      total,
      data: data.map((hook) => ({
        id: hook.id.toString(),
        roomId: hook.room_id.toString(),
        url: hook.url,
        method: hook.method,
        header: hook.header.toString(),
        body: hook.body.toString(),
        type: hook.type,
        createdTime: hook.create_time.toString(),
        updatedTime: hook.update_time.toString(),
        creatorId: hook.creator_id.toString(),
      })),
    };
  }

  @GrpcMethod(ROOM_HOOK_SERVICE_NAME, 'updateRoomHook')
  async updateRoomHook(request: UpdateRoomHookRequest): Promise<RoomHook> {
    const hook = await this.roomHookService.updateRoomHook(request);
    return {
      id: hook.id.toString(),
      roomId: hook.room_id.toString(),
      url: hook.url,
      method: hook.method,
      header: hook.header.toString(),
      body: hook.body.toString(),
      type: hook.type,
      createdTime: hook.create_time.toString(),
      updatedTime: hook.update_time.toString(),
      creatorId: hook.creator_id.toString(),
    };
  }

  @GrpcMethod(ROOM_HOOK_SERVICE_NAME, 'deleteRoomHook')
  async deleteRoomHook(request: DeleteRoomHookRequest): Promise<VoidResponse> {
    try {
      await this.roomHookService.deleteRoomHook(request);
      return {
        ok: true,
        error: '',
      };
    } catch (e) {
      this.logger.error(e);
      return {
        ok: false,
        error: e.message,
      };
    }
  }
}
