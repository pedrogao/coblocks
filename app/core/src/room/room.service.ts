import { Injectable } from '@nestjs/common';
import { Room } from '@prisma/client';
import { PrismaService } from '../dao/prisma.service';
import { FindRoomListRequest } from '@coblocks/proto';
import { DeleteStatus, camelToSnake } from '@coblocks/common';

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

function convertQuery(query: object): any {
  if (query.hasOwnProperty('$and')) {
    return {
      AND: query['$and'].map((condition: any) => convertQuery(condition)),
    };
  }

  // 转换其他操作符（如 $eq）
  const newQuery: any = {};
  for (const key in query) {
    const newKey = camelToSnake(key);
    if (query[key].hasOwnProperty('$eq')) {
      newQuery[newKey] = { equals: query[key]['$eq'] };
    }
    if (query[key].hasOwnProperty('$ne')) {
      newQuery[newKey] = { not: query[key]['$ne'] };
    }
    if (query[key].hasOwnProperty('$gt')) {
      newQuery[newKey] = { gt: query[key]['$gt'] };
    }
    if (query[key].hasOwnProperty('$gte')) {
      newQuery[newKey] = { gte: query[key]['$gte'] };
    }
    if (query[key].hasOwnProperty('$lt')) {
      newQuery[newKey] = { lt: query[key]['$lt'] };
    }
    if (query[key].hasOwnProperty('$lte')) {
      newQuery[newKey] = { lte: query[key]['$lte'] };
    }
    if (query[key].hasOwnProperty('$in')) {
      newQuery[newKey] = { in: query[key]['$in'] };
    }
    if (query[key].hasOwnProperty('$nin')) {
      newQuery[newKey] = { notIn: query[key]['$nin'] };
    }
    if (query[key].hasOwnProperty('$like')) {
      newQuery[newKey] = { contains: query[key]['$like'] };
    }
    if (query[key].hasOwnProperty('$nlike')) {
      newQuery[newKey] = { notContains: query[key]['$nlike'] };
    }
  }
  return newQuery;
}
