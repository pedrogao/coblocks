import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { PROJECT_SERVICE_NAME, ProjectServiceClient, ProjectListResponse } from '@coblocks/proto';
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

  async create(createProjectDto: CreateProjectDto, creatorId: number) {
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
      id: Number(resp.id),
      name: resp.name,
      environment: resp.environment,
      description: resp.description,
    };
  }

  async findMany(dto: FindProjectDto, creatorId: number): Promise<ProjectListResponse> {
    const { offset, limit } = dto;

    const resp = await this.projectService
      .findProjectList({ creatorId, limit, offset })
      .toPromise();

    if (resp.data && resp.data.length > 0) {
      resp.data = resp.data.map((project) => {
        return {
          id: Number(project.id),
          name: project.name,
          environment: project.environment,
          description: project.description,
        };
      });
    }

    return resp;
  }

  async findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
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
      id: Number(resp.id),
      name: resp.name,
      environment: resp.environment,
      description: resp.description,
    };
  }

  async remove(id: number) {
    throw new Error('Project remove is not support currently.');
  }
}
