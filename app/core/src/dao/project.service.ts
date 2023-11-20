import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Project } from '@prisma/client';

@Injectable()
export class ProjectService {
  constructor(private readonly prismaService: PrismaService) {}

  async findProject(creatorId: number): Promise<Project[]> {
    return this.prismaService.project.findMany({
      where: {
        creator_id: creatorId,
      },
    });
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
