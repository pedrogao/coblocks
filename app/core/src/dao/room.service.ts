import { Injectable } from '@nestjs/common';
import { Room } from '@prisma/client';
import { PrismaService } from './prisma.service';

interface FindRoomListParams {
  projectId?: number;
  creatorId: number;
  limit: number;
  offset: number;
}

@Injectable()
export class RoomService {
  constructor(private readonly prismaService: PrismaService) {}

  async findRoomList({ projectId, limit, offset, creatorId }: FindRoomListParams) {
    const prisma = this.prismaService;

    const condition = {
      where: {
        creator_id: creatorId,
      },
      take: limit,
      skip: offset,
    };
    if (projectId) {
      condition.where['project_id'] = projectId;
    }
    const [rooms, total] = await prisma.$transaction([
      prisma.room.findMany(condition),
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
    projectId: number;
    creatorId: number;
    status: boolean;
  }): Promise<Room> {
    return this.prismaService.room.create({
      data: {
        name,
        project_id: projectId,
        creator_id: creatorId,
        status,
      },
    });
  }

  async updateRoom({ id, status }: { id: number; status: boolean }): Promise<Room> {
    return this.prismaService.room.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }
}
