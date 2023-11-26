import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  ProjectServiceControllerMethods,
  ProjectServiceController,
  PROJECT_SERVICE_NAME,
  ProjectByCreatorIdRequest,
  ProjectListResponse,
  CreateProjectRequest,
  Project,
  UpdateProjectRequest,
  VoidResponse,
  DeleteProjectRequest,
  FindProjectRequest,
} from '@coblocks/proto';
import { ProjectService } from './project.service';

@Controller()
@ProjectServiceControllerMethods()
export class ProjectController implements ProjectServiceController {
  private readonly logger = new Logger(ProjectController.name);

  constructor(private projectService: ProjectService) {}

  @GrpcMethod(PROJECT_SERVICE_NAME, 'findProjectList')
  async findProjectList(request: ProjectByCreatorIdRequest): Promise<ProjectListResponse> {
    const creatorId =
      typeof request.creatorId === 'number' ? request.creatorId : Number(request.creatorId);

    const { projects, total } = await this.projectService.findProjectList({
      creatorId,
      limit: request.limit,
      offset: request.offset,
    });

    return {
      total,
      data:
        projects.map((project) => {
          return {
            id: project.id.toString(),
            name: project.name,
            environment: project.environment,
            description: project.description,
          };
        }) || [],
    };
  }

  @GrpcMethod(PROJECT_SERVICE_NAME, 'createProject')
  async createProject(request: CreateProjectRequest): Promise<Project> {
    return this.projectService
      .createProject({
        name: request.name,
        environment: request.environment,
        description: request.description,
        creatorId: request.creatorId,
      })
      .then((project) => {
        return {
          id: project.id.toString(),
          name: project.name,
          environment: project.environment,
          description: project.description,
        };
      });
  }

  @GrpcMethod(PROJECT_SERVICE_NAME, 'updateProject')
  async updateProject(request: UpdateProjectRequest): Promise<Project> {
    return this.projectService
      .updateProject({
        id: request.id,
        name: request.name,
        environment: request.environment,
        description: request.description,
      })
      .then((project) => {
        return {
          id: project.id.toString(),
          name: project.name,
          environment: project.environment,
          description: project.description,
        };
      });
  }

  @GrpcMethod(PROJECT_SERVICE_NAME, 'deleteProject')
  async deleteProject(request: DeleteProjectRequest): Promise<VoidResponse> {
    try {
      await this.projectService.deleteProject(request.id);
      return {
        ok: true,
        error: '',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        ok: false,
        error: error.message,
      };
    }
  }

  @GrpcMethod(PROJECT_SERVICE_NAME, 'findProject')
  async findProject(request: FindProjectRequest): Promise<Project> {
    return this.projectService.findProject(request.id).then((project) => {
      return {
        id: project.id.toString(),
        name: project.name,
        environment: project.environment,
        description: project.description,
      };
    });
  }
}
