import { Injectable } from '@nestjs/common';
import { DeleteStatus } from '@coblocks/common';
import { Project } from '../generated/client';
import { PrismaService } from '../dao/prisma.service';

interface FindProjectListParams {
  creatorId: number;
  limit: number;
  offset: number;
}

@Injectable()
export class ProjectService {
  constructor(private readonly prismaService: PrismaService) {}

  async findProjectList({ creatorId, limit, offset }: FindProjectListParams) {
    const prisma = this.prismaService;

    const [projects, total] = await prisma.$transaction([
      prisma.project.findMany({
        where: {
          creator_id: creatorId,
          delete_status: DeleteStatus.Normal,
        },
        take: limit,
        skip: offset,
      }),
      prisma.project.count(),
    ]);
    return {
      projects,
      total,
    };
  }

  async createProject({
    name,
    environment,
    description,
    creatorId,
  }: {
    name: string;
    environment: string;
    description?: string;
    creatorId: number | string;
  }): Promise<Project> {
    return this.prismaService.project.create({
      data: {
        name,
        environment,
        description,
        creator_id: creatorId as number,
      },
    });
  }

  async updateProject({
    id,
    name,
    environment,
    description,
  }: {
    id: number | string;
    name?: string;
    environment?: string;
    description?: string;
  }): Promise<Project> {
    return this.prismaService.project.update({
      where: {
        id: BigInt(id),
        delete_status: DeleteStatus.Normal,
      },
      data: {
        name,
        environment,
        description,
      },
    });
  }

  async findProject(id: string | number) {
    return this.prismaService.project.findFirst({
      where: {
        id: BigInt(id),
        delete_status: DeleteStatus.Normal,
      },
    });
  }

  async deleteProject(id: string) {
    return this.prismaService.project.update({
      where: {
        id: BigInt(id),
        delete_status: DeleteStatus.Normal,
      },
      data: {
        delete_time: new Date(),
        delete_status: DeleteStatus.Deleted,
      },
    });
  }
}
