import {
  CreateProjectAPIKeyRequest,
  DeleteProjectAPIKeyRequest,
  FindProjectAPIKeyListRequest,
  UpdateProjectAPIKeyRequest,
  FindProjectAPIKeyRequest,
} from '@coblocks/proto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../dao/prisma.service';
import { convertQuery } from '../query';
import { DeleteStatus } from '@coblocks/common';

@Injectable()
export class ProjectApikeyService {
  constructor(private readonly prismaService: PrismaService) {}

  async findProjectApiKeyList(req: FindProjectAPIKeyListRequest) {
    const { s, limit, offset } = req;
    const prisma = this.prismaService;
    const filters = s ? JSON.parse(s) : {};
    const query = convertQuery(filters);

    const [data, total] = await prisma.$transaction([
      prisma.projectAPIKey.findMany({
        where: {
          ...query,
          delete_status: DeleteStatus.Normal,
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
        delete_status: DeleteStatus.Normal,
      },
      data: {
        permission: req.permission,
        room_list: req.roomList,
      },
    });
  }

  async deleteProjectAPIKey(req: DeleteProjectAPIKeyRequest) {
    return this.prismaService.projectAPIKey.update({
      where: {
        id: BigInt(req.id),
        delete_status: DeleteStatus.Normal,
      },
      data: {
        delete_status: DeleteStatus.Deleted,
        delete_time: new Date(),
      },
    });
  }

  async createProjectAPIKey(req: CreateProjectAPIKeyRequest) {
    return this.prismaService.projectAPIKey.create({
      data: {
        project_id: BigInt(req.projectId),
        api_key: req.apiKey,
        permission: req.permission,
        room_list: req.roomList,
        creator_id: BigInt(req.creatorId),
      },
    });
  }

  async findProjectAPIKey(req: FindProjectAPIKeyRequest) {
    return this.prismaService.projectAPIKey.findFirst({
      where: {
        api_key: req.apiKey,
      },
    });
  }
}
