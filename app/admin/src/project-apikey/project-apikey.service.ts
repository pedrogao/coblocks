import { Inject, Injectable } from '@nestjs/common';
import { CreateProjectApikeyDto } from './dto/create-project-apikey.dto';
import { UpdateProjectApikeyDto } from './dto/update-project-apikey.dto';
import { ProjectAPIKeyServiceClient, PROJECT_AP_IKEY_SERVICE_NAME } from '@coblocks/proto';
import { ClientGrpc } from '@nestjs/microservices';
import { Permission } from '@coblocks/common';
import { AuthService } from '../auth/auth.service';
import { FindManyDto } from './dto/find-many.dto';

@Injectable()
export class ProjectApikeyService {
  private rpcClient: ProjectAPIKeyServiceClient;

  constructor(
    @Inject('project-api-key') private client: ClientGrpc,
    private authService: AuthService,
  ) {}

  onModuleInit() {
    this.rpcClient = this.client.getService<ProjectAPIKeyServiceClient>(
      PROJECT_AP_IKEY_SERVICE_NAME,
    );
  }

  async create(createProjectApikeyDto: CreateProjectApikeyDto, creatorId: string) {
    const permission =
      createProjectApikeyDto.permission === undefined
        ? Permission.None
        : createProjectApikeyDto.permission === 'ReadOnly'
        ? Permission.ReadOnly
        : Permission.ReadWrite;
    const apiKey = await this.authService.generateAPIKey(
      creatorId,
      createProjectApikeyDto.projectId,
    );
    const resp = await this.rpcClient
      .createProjectApiKey({
        creatorId,
        projectId: createProjectApikeyDto.projectId,
        permission,
        roomList: JSON.stringify(createProjectApikeyDto.roomList),
        apiKey,
      })
      .toPromise();

    return {
      id: resp.id,
      projectId: resp.projectId,
      permission: resp.permission,
      roomList: resp.roomList,
      apiKey: resp.apiKey,
    };
  }

  async findMany(query: FindManyDto) {
    const resp = await this.rpcClient
      .findProjectApiKeyList({
        limit: query.limit,
        offset: query.offset,
        s: query.s,
      })
      .toPromise();

    return {
      data:
        resp.data?.map((item) => {
          return {
            ...item,
            permission: item.permission === Permission.ReadOnly ? 'ReadOnly' : 'ReadWrite',
          };
        }) || [],
      total: resp.total,
      count: query.limit,
      page: Math.ceil(query.offset / query.limit) + 1,
      pageCount: Math.ceil(resp.total / query.limit),
    };
  }

  async findOne(id: string) {
    // TODO:
    return `This action returns a #${id} projectApikey`;
  }

  async update(id: string, updateProjectApikeyDto: UpdateProjectApikeyDto) {
    // TODO:
    return `This action updates a #${id} projectApikey`;
  }

  async remove(id: string) {
    await this.rpcClient.deleteProjectApiKey({ id }).toPromise();

    return {
      message: 'ok',
    };
  }
}
