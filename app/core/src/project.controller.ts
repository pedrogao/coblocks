import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
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
  findProjectList(
    request: ProjectByCreatorIdRequest,
    _metadata?: Metadata,
  ): Promise<ProjectListResponse> | Observable<ProjectListResponse> | ProjectListResponse {
    const creatorId =
      typeof request.creatorId === 'number' ? request.creatorId : Number(request.creatorId);
    return this.projectService.findProject(creatorId).then((projects) => {
      return {
        projects: projects.map((project) => {
          return {
            id: Number(project.id),
            name: project.name,
            environment: project.environment,
            description: project.description,
          };
        }),
      };
    });
  }

  @GrpcMethod(PROJECT_SERVICE_NAME, 'createProject')
  createProject(
    request: CreateProjectRequest,
    _metadata?: Metadata,
  ): Promise<Project> | Observable<Project> | Project {
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
  updateProject(
    request: UpdateProjectRequest,
    _metadata?: Metadata,
  ): Promise<Project> | Observable<Project> | Project {
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
