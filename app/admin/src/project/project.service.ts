import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { PROJECT_SERVICE_NAME, ProjectServiceClient } from '@coblocks/proto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FindProjectDto } from './dto/find-project.dto';

@Injectable()
export class ProjectService implements OnModuleInit {
  private projectService: ProjectServiceClient;

  constructor(@Inject('project') private client: ClientGrpc) {}

  onModuleInit() {
    this.projectService = this.client.getService<ProjectServiceClient>(PROJECT_SERVICE_NAME);
  }

  async create(createProjectDto: CreateProjectDto, creatorId: string) {
    const { name, description, environment } = createProjectDto;
    const resp = await this.projectService
      .createProject({
        name,
        description,
        environment,
        creatorId,
      })
      .toPromise();

    return {
      id: resp.id,
      name: resp.name,
      environment: resp.environment,
      description: resp.description,
    };
  }

  async findMany(dto: FindProjectDto, creatorId: string) {
    const { offset, limit } = dto;

    const resp = await this.projectService
      .findProjectList({ creatorId, limit, offset })
      .toPromise();

    return {
      data: resp.data,
      total: resp.total,
      count: limit,
      page: Math.ceil(offset / limit) + 1,
      pageCount: Math.ceil(resp.total / limit),
    };
  }

  async findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const { name, description, environment } = updateProjectDto;
    const resp = await this.projectService
      .updateProject({
        id,
        name,
        description,
        environment,
      })
      .toPromise();

    return {
      id: resp.id,
      name: resp.name,
      environment: resp.environment,
      description: resp.description,
    };
  }

  async remove(id: number) {
    throw new Error('Project remove is not support currently.');
  }
}
