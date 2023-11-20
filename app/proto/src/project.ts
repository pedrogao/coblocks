/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "project";

export interface UpdateProjectRequest {
  id: number;
  name?: string | undefined;
  environment?: string | undefined;
  description?: string | undefined;
}

export interface CreateProjectRequest {
  name: string;
  environment: string;
  description?: string | undefined;
  creatorId: number;
}

export interface ProjectByCreatorIdRequest {
  creatorId: number;
}

export interface ProjectListResponse {
  projects: Project[];
}

export interface Project {
  id: number;
  name: string;
  environment: string;
  description: string;
}

export const PROJECT_PACKAGE_NAME = "project";

export interface ProjectServiceClient {
  findProjectList(request: ProjectByCreatorIdRequest, metadata?: Metadata): Observable<ProjectListResponse>;

  createProject(request: CreateProjectRequest, metadata?: Metadata): Observable<Project>;

  updateProject(request: UpdateProjectRequest, metadata?: Metadata): Observable<Project>;
}

export interface ProjectServiceController {
  findProjectList(
    request: ProjectByCreatorIdRequest,
    metadata?: Metadata,
  ): Promise<ProjectListResponse> | Observable<ProjectListResponse> | ProjectListResponse;

  createProject(request: CreateProjectRequest, metadata?: Metadata): Promise<Project> | Observable<Project> | Project;

  updateProject(request: UpdateProjectRequest, metadata?: Metadata): Promise<Project> | Observable<Project> | Project;
}

export function ProjectServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findProjectList", "createProject", "updateProject"];
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
