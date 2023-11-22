import { Injectable } from '@nestjs/common';
import { Project } from '@prisma/client';
import { PrismaService } from './prisma.service';

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
    creatorId: number;
  }): Promise<Project> {
    return this.prismaService.project.create({
      data: {
        name,
        environment,
        description,
        creator_id: creatorId,
      },
    });
  }

  async updateProject({
    id,
    name,
    environment,
    description,
  }: {
    id: number;
    name?: string;
    environment?: string;
    description?: string;
  }): Promise<Project> {
    return this.prismaService.project.update({
      where: {
        id,
      },
      data: {
        name,
        environment,
        description,
      },
    });
  }
}
