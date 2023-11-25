import {
  CreateProjectAPIKeyRequest,
  DeleteProjectAPIKeyRequest,
  FindProjectAPIKeyListRequest,
  UpdateProjectAPIKeyRequest,
} from '@coblocks/proto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../dao/prisma.service';

@Injectable()
export class ProjectApikeyService {
  constructor(private readonly prismaService: PrismaService) {}

  async findProjectApiKeyList(req: FindProjectAPIKeyListRequest) {
    const { projectId, limit, offset } = req;
    const prisma = this.prismaService;

    const [data, total] = await prisma.$transaction([
      prisma.projectAPIKey.findMany({
        where: {
          project_id: BigInt(projectId),
        },
        take: limit,
        skip: offset,
      }),
      prisma.projectAPIKey.count(),
    ]);

    return {
      data,
      total,
    };
  }

  async updateProjectAPIKey(req: UpdateProjectAPIKeyRequest) {
    return this.prismaService.projectAPIKey.update({
      where: {
        id: BigInt(req.id),
      },
      data: {
        permission: req.permission,
        room_list: req.roomList,
      },
    });
  }

  async deleteProjectAPIKey(req: DeleteProjectAPIKeyRequest) {
    return this.prismaService.projectAPIKey.delete({
      where: {
        id: BigInt(req.id),
      },
    });
  }

  async createProjectAPIKey(req: CreateProjectAPIKeyRequest) {
    return this.prismaService.projectAPIKey.create({
      data: {
        project_id: BigInt(req.projectId),
        permission: req.permission,
        room_list: req.roomList,
        creator_id: BigInt(req.creatorId),
      },
    });
  }
}
