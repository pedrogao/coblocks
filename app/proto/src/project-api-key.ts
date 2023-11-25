/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { VoidResponse } from "./common";

export interface UpdateProjectAPIKeyRequest {
  id: string;
  permission?: number | undefined;
  roomList?: string | undefined;
}

export interface DeleteProjectAPIKeyRequest {
  id: string;
}

export interface CreateProjectAPIKeyRequest {
  projectId: string;
  permission?: number | undefined;
  roomList: string;
  apiKey: string;
  creatorId: string;
}

export interface FindProjectAPIKeyListRequest {
  projectId: string;
  limit: number;
  offset: number;
}

export interface FindProjectAPIKeyListResponse {
  projectApiKeys: ProjectAPIKey[];
  total: number;
}

export interface ProjectAPIKey {
  id: string;
  projectId: string;
  permission: number;
  apiKey: string;
  roomList: string;
  status: number;
  createdTime: string;
  updatedTime: string;
}

export interface ProjectAPIKeyServiceClient {
  findProjectApiKeyList(
    request: FindProjectAPIKeyListRequest,
    metadata?: Metadata,
  ): Observable<FindProjectAPIKeyListResponse>;

  createProjectApiKey(request: CreateProjectAPIKeyRequest, metadata?: Metadata): Observable<ProjectAPIKey>;

  updateProjectApiKey(request: UpdateProjectAPIKeyRequest, metadata?: Metadata): Observable<ProjectAPIKey>;

  deleteProjectApiKey(request: DeleteProjectAPIKeyRequest, metadata?: Metadata): Observable<VoidResponse>;
}

export interface ProjectAPIKeyServiceController {
  findProjectApiKeyList(
    request: FindProjectAPIKeyListRequest,
    metadata?: Metadata,
  ): Promise<FindProjectAPIKeyListResponse> | Observable<FindProjectAPIKeyListResponse> | FindProjectAPIKeyListResponse;

  createProjectApiKey(
    request: CreateProjectAPIKeyRequest,
    metadata?: Metadata,
  ): Promise<ProjectAPIKey> | Observable<ProjectAPIKey> | ProjectAPIKey;

  updateProjectApiKey(
    request: UpdateProjectAPIKeyRequest,
    metadata?: Metadata,
  ): Promise<ProjectAPIKey> | Observable<ProjectAPIKey> | ProjectAPIKey;

  deleteProjectApiKey(
    request: DeleteProjectAPIKeyRequest,
    metadata?: Metadata,
  ): Promise<VoidResponse> | Observable<VoidResponse> | VoidResponse;
}

export function ProjectAPIKeyServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "findProjectApiKeyList",
      "createProjectApiKey",
      "updateProjectApiKey",
      "deleteProjectApiKey",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ProjectAPIKeyService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ProjectAPIKeyService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const PROJECT_AP_IKEY_SERVICE_NAME = "ProjectAPIKeyService";
