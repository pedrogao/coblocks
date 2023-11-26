import {
  CreateRoomMetadataRequest,
  GetRoomMetadataRequest,
  UpdateRoomMetadataRequest,
} from '@coblocks/proto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../dao/prisma.service';

@Injectable()
export class RoomMetadataService {
  constructor(private readonly prismaService: PrismaService) {}

  async createRoomMetadata(request: CreateRoomMetadataRequest) {
    return await this.prismaService.roomMetadata.create({
      data: {
        room_id: BigInt(request.roomId),
        metadata: request.metadata,
        creator_id: BigInt(request.creatorId),
      },
    });
  }

  async updateRoomMetadata(request: UpdateRoomMetadataRequest) {
    return await this.prismaService.roomMetadata.update({
      // @ts-ignore
      where: {
        room_id: BigInt(request.roomId),
      },
      data: {
        metadata: request.metadata,
      },
    });
  }

  async getRoomMetadata(request: GetRoomMetadataRequest) {
    return await this.prismaService.roomMetadata.findFirst({
      where: {
        room_id: BigInt(request.roomId),
      },
    });
  }
}
