import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import {
  ProjectServiceControllerMethods,
  ProjectServiceController,
  PROJECT_SERVICE_NAME,
  ProjectByCreatorIdRequest,
  ProjectListResponse,
  CreateProjectRequest,
  Project,
  UpdateProjectRequest,
} from '@coblocks/proto';
import { ProjectService } from './dao/project.service';

@Controller()
@ProjectServiceControllerMethods()
export class ProjectController implements ProjectServiceController {
  constructor(private projectService: ProjectService) {}

  @GrpcMethod(PROJECT_SERVICE_NAME, 'findProjectList')
  async findProjectList(
    request: ProjectByCreatorIdRequest,
    _metadata?: Metadata,
  ): Promise<ProjectListResponse> {
    const creatorId =
      typeof request.creatorId === 'number' ? request.creatorId : Number(request.creatorId);

    const { projects, total } = await this.projectService.findProjectList({
      creatorId,
      limit: request.limit,
      offset: request.offset,
    });

    return {
      count: request.limit,
      page: Math.ceil(request.offset / request.limit) + 1,
      total,
      pageCount: Math.ceil(total / request.limit),
      data:
        projects.map((project) => {
          return {
            id: Number(project.id),
            name: project.name,
            environment: project.environment,
            description: project.description,
          };
        }) || [],
    };
  }

  @GrpcMethod(PROJECT_SERVICE_NAME, 'createProject')
  async createProject(request: CreateProjectRequest, _metadata?: Metadata): Promise<Project> {
    return this.projectService
      .createProject({
        name: request.name,
        environment: request.environment,
        description: request.description,
        creatorId: request.creatorId,
      })
      .then((project) => {
        return {
          id: Number(project.id),
          name: project.name,
          environment: project.environment,
          description: project.description,
        };
      });
  }

  @GrpcMethod(PROJECT_SERVICE_NAME, 'updateProject')
  async updateProject(request: UpdateProjectRequest, _metadata?: Metadata): Promise<Project> {
    return this.projectService
      .updateProject({
        id: request.id,
        name: request.name,
        environment: request.environment,
        description: request.description,
      })
      .then((project) => {
        return {
          id: Number(project.id),
          name: project.name,
          environment: project.environment,
          description: project.description,
        };
      });
  }
}
