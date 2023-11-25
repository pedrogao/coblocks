/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { VoidResponse } from "./common";

export interface DeleteProjectRequest {
  id: string;
}

export interface FindProjectRequest {
  id: string;
}

export interface UpdateProjectRequest {
  id: string;
  name?: string | undefined;
  environment?: string | undefined;
  description?: string | undefined;
}

export interface CreateProjectRequest {
  name: string;
  environment: string;
  description?: string | undefined;
  creatorId: string;
}

export interface ProjectByCreatorIdRequest {
  creatorId: string;
  limit: number;
  offset: number;
}

export interface ProjectListResponse {
  total: number;
  data: Project[];
}

export interface Project {
  id: string;
  name: string;
  environment: string;
  description: string;
}

export interface ProjectServiceClient {
  findProjectList(request: ProjectByCreatorIdRequest, metadata?: Metadata): Observable<ProjectListResponse>;

  findProject(request: FindProjectRequest, metadata?: Metadata): Observable<Project>;

  createProject(request: CreateProjectRequest, metadata?: Metadata): Observable<Project>;

  updateProject(request: UpdateProjectRequest, metadata?: Metadata): Observable<Project>;

  deleteProject(request: DeleteProjectRequest, metadata?: Metadata): Observable<VoidResponse>;
}

export interface ProjectServiceController {
  findProjectList(
    request: ProjectByCreatorIdRequest,
    metadata?: Metadata,
  ): Promise<ProjectListResponse> | Observable<ProjectListResponse> | ProjectListResponse;

  findProject(request: FindProjectRequest, metadata?: Metadata): Promise<Project> | Observable<Project> | Project;

  createProject(request: CreateProjectRequest, metadata?: Metadata): Promise<Project> | Observable<Project> | Project;

  updateProject(request: UpdateProjectRequest, metadata?: Metadata): Promise<Project> | Observable<Project> | Project;

  deleteProject(
    request: DeleteProjectRequest,
    metadata?: Metadata,
  ): Promise<VoidResponse> | Observable<VoidResponse> | VoidResponse;
}

export function ProjectServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findProjectList", "findProject", "createProject", "updateProject", "deleteProject"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ProjectService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ProjectService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const PROJECT_SERVICE_NAME = "ProjectService";
