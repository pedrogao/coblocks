import { Controller } from '@nestjs/common';
import { RoomDocService } from './room-doc.service';
import {
  CreateRoomDocRequest,
  GetRoomDocRequest,
  RoomDoc,
  RoomDocServiceController,
  RoomDocServiceControllerMethods,
  UpdateRoomDocRequest,
  ROOM_DOC_SERVICE_NAME,
} from '@coblocks/proto';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
@RoomDocServiceControllerMethods()
export class RoomDocController implements RoomDocServiceController {
  constructor(private readonly roomDocService: RoomDocService) {}

  @GrpcMethod(ROOM_DOC_SERVICE_NAME, 'createRoomDoc')
  async createRoomDoc(request: CreateRoomDocRequest): Promise<RoomDoc> {
    const roomDoc = await this.roomDocService.createRoomDoc(request);
    return {
      id: roomDoc.id.toString(),
      doc: roomDoc.doc,
      creatorId: roomDoc.creator_id.toString(),
      roomId: roomDoc.room_id.toString(),
      createTime: roomDoc.create_time.toISOString(),
      updateTime: roomDoc.update_time.toISOString(),
    };
  }

  @GrpcMethod(ROOM_DOC_SERVICE_NAME, 'getRoomDoc')
  async getRoomDoc(request: GetRoomDocRequest): Promise<RoomDoc> {
    const roomDoc = await this.roomDocService.getRoomDoc(request);
    return {
      id: roomDoc.id.toString(),
      doc: roomDoc.doc,
      creatorId: roomDoc.creator_id.toString(),
      roomId: roomDoc.room_id.toString(),
      createTime: roomDoc.create_time.toISOString(),
      updateTime: roomDoc.update_time.toISOString(),
    };
  }

  @GrpcMethod(ROOM_DOC_SERVICE_NAME, 'updateRoomDoc')
  async updateRoomDoc(request: UpdateRoomDocRequest): Promise<RoomDoc> {
    const roomDoc = await this.roomDocService.updateRoomDoc(request);
    return {
      id: roomDoc.id.toString(),
      doc: roomDoc.doc,
      creatorId: roomDoc.creator_id.toString(),
      roomId: roomDoc.room_id.toString(),
      createTime: roomDoc.create_time.toISOString(),
      updateTime: roomDoc.update_time.toISOString(),
    };
  }
}
