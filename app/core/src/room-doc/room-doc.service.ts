import { CreateRoomDocRequest, GetRoomDocRequest, UpdateRoomDocRequest } from '@coblocks/proto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../dao/prisma.service';

@Injectable()
export class RoomDocService {
  constructor(private readonly prismaService: PrismaService) {}

  async updateRoomDoc(request: UpdateRoomDocRequest) {
    const { doc, roomId } = request;
    return this.prismaService.roomDoc.update({
      // @ts-ignore
      where: {
        room_id: BigInt(roomId),
      },
      data: {
        doc,
      },
    });
  }

  async getRoomDoc(request: GetRoomDocRequest) {
    return this.prismaService.roomDoc.findFirst({
      where: {
        room_id: BigInt(request.roomId),
      },
    });
  }

  async createRoomDoc(request: CreateRoomDocRequest) {
    const { doc, creatorId, roomId } = request;
    return this.prismaService.roomDoc.create({
      data: {
        doc,
        creator_id: BigInt(creatorId),
        room_id: BigInt(roomId),
      },
    });
  }
}
