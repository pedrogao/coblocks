import { Injectable } from '@nestjs/common';
import { Room } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class RoomService {
  constructor(private readonly prismaService: PrismaService) {}

  async findRoomList(projectId: number): Promise<Room[]> {
    return this.prismaService.room.findMany({
      where: {
        project_id: projectId,
      },
    });
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
