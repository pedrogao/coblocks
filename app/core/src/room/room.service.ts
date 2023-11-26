import { Injectable } from '@nestjs/common';
import { Room } from '@prisma/client';
import { PrismaService } from '../dao/prisma.service';
import { FindRoomListRequest } from '@coblocks/proto';
import { DeleteStatus } from '@coblocks/common';
import { convertQuery } from '../query';

@Injectable()
export class RoomService {
  constructor(private readonly prismaService: PrismaService) {}

  async findRoomList(request: FindRoomListRequest) {
    const prisma = this.prismaService;
    const { s, sorters, creatorId, limit, offset } = request;
    const filters = s ? JSON.parse(s) : {};
    const query = convertQuery(filters);
    const condition = {
      where: {
        creator_id: BigInt(creatorId),
        delete_status: DeleteStatus.Normal,
        ...query,
      },
      take: limit,
      skip: offset,
    };

    const [rooms, total] = await prisma.$transaction([
      prisma.room.findMany({
        ...condition,
        orderBy: sorters?.map((sorter) => {
          return {
            [sorter.field]: sorter.order,
          };
        }),
      }),
      prisma.room.count(),
    ]);
    return {
      rooms,
      total,
    };
  }

  async createRoom({
    name,
    projectId,
    creatorId,
    status,
  }: {
    name: string;
    projectId: number | string;
    creatorId: number | string;
    status: boolean;
  }): Promise<Room> {
    return this.prismaService.room.create({
      data: {
        name,
        project_id: projectId as number,
        creator_id: creatorId as number,
        status,
      },
    });
  }

  async updateRoom({ id, status }: { id: number | string; status: boolean }): Promise<Room> {
    return this.prismaService.room.update({
      where: {
        id: id as number,
        delete_status: DeleteStatus.Normal,
      },
      data: {
        status,
      },
    });
  }

  async deleteRoom(id: number | string) {
    return this.prismaService.room.update({
      where: {
        id: BigInt(id),
        delete_status: DeleteStatus.Normal,
      },
      data: {
        delete_status: DeleteStatus.Deleted,
        delete_time: new Date(),
      },
    });
  }

  async findRoom(id: number | string) {
    return this.prismaService.room.findUnique({
      where: {
        id: BigInt(id),
        delete_status: DeleteStatus.Normal,
      },
    });
  }
}
