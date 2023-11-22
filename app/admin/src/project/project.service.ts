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

  async create(createProjectDto: CreateProjectDto) {
    return 'This action adds a new project';
  }

  async findMany(dto: FindProjectDto): Promise<ProjectListResponse> {
    const { page, offset, limit, creatorId } = dto;

    const resp = await this.projectService
      .findProjectList({ creatorId, limit, offset })
      .toPromise();

    // resp.page = page;
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
    return `This action updates a #${id} project`;
  }

  async remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
