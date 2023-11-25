import { Controller, Logger } from '@nestjs/common';
import { RoomMetadataService } from './room-metadata.service';
import {
  CreateRoomMetadataRequest,
  GetRoomMetadataRequest,
  RoomMetadata,
  RoomMetadataServiceController,
  UpdateRoomMetadataRequest,
  ROOM_METADATA_SERVICE_NAME,
  RoomMetadataServiceControllerMethods,
} from '@coblocks/proto';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
@RoomMetadataServiceControllerMethods()
export class RoomMetadataController implements RoomMetadataServiceController {
  private readonly logger = new Logger(RoomMetadataController.name);

  constructor(private readonly roomMetadataService: RoomMetadataService) {}

  @GrpcMethod(ROOM_METADATA_SERVICE_NAME, 'getRoomMetadata')
  async getRoomMetadata(request: GetRoomMetadataRequest): Promise<RoomMetadata> {
    const metadata = await this.roomMetadataService.getRoomMetadata(request);
    return {
      id: metadata.id.toString(),
      roomId: metadata.room_id.toString(),
      metadata: metadata.metadata.toString(),
      creatorId: metadata.creator_id.toString(),
      createTime: metadata.create_time.toString(),
      updateTime: metadata.update_time.toString(),
    };
  }

  @GrpcMethod(ROOM_METADATA_SERVICE_NAME, 'updateRoomMetadata')
  async updateRoomMetadata(request: UpdateRoomMetadataRequest): Promise<RoomMetadata> {
    const metadata = await this.roomMetadataService.updateRoomMetadata(request);
    return {
      id: metadata.id.toString(),
      roomId: metadata.room_id.toString(),
      metadata: metadata.metadata.toString(),
      creatorId: metadata.creator_id.toString(),
      createTime: metadata.create_time.toString(),
      updateTime: metadata.update_time.toString(),
    };
  }

  @GrpcMethod(ROOM_METADATA_SERVICE_NAME, 'createRoomMetadata')
  async createRoomMetadata(request: CreateRoomMetadataRequest): Promise<RoomMetadata> {
    const metadata = await this.roomMetadataService.createRoomMetadata(request);
    return {
      id: metadata.id.toString(),
      roomId: metadata.room_id.toString(),
      metadata: metadata.metadata.toString(),
      creatorId: metadata.creator_id.toString(),
      createTime: metadata.create_time.toString(),
      updateTime: metadata.update_time.toString(),
    };
  }
}
