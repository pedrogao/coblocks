import {
  CreateRoomHookRequest,
  DeleteRoomHookRequest,
  FindRoomHookListRequest,
  UpdateRoomHookRequest,
} from '@coblocks/proto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../dao/prisma.service';

@Injectable()
export class RoomHookService {
  constructor(private readonly prismaService: PrismaService) {}

  async deleteRoomHook(request: DeleteRoomHookRequest) {
    return this.prismaService.roomHook.delete({
      where: {
        id: BigInt(request.id),
      },
    });
  }

  async updateRoomHook(request: UpdateRoomHookRequest) {
    return this.prismaService.roomHook.update({
      where: {
        id: BigInt(request.id),
      },
      data: {
        url: request.url,
        method: request.method,
        header: request.header,
        body: request.body,
        type: request.type,
      },
    });
  }

  async findRoomHookList(req: FindRoomHookListRequest) {
    const { roomId, limit, offset } = req;
    const prisma = this.prismaService;

    const [data, total] = await prisma.$transaction([
      prisma.roomHook.findMany({
        where: {
          room_id: BigInt(roomId),
        },
        take: limit,
        skip: offset,
      }),
      prisma.roomHook.count(),
    ]);

    return {
      data,
      total,
    };
  }

  async createRoomHook(request: CreateRoomHookRequest) {
    return this.prismaService.roomHook.create({
      data: {
        room_id: BigInt(request.roomId),
        creator_id: BigInt(request.creatorId),
        url: request.url,
        method: request.method,
        header: request.header,
        body: request.body,
        type: request.type,
      },
    });
  }
}
