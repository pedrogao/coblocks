import { Controller, Logger } from '@nestjs/common';
import { ProjectApikeyService } from './project-apikey.service';
import {
  ProjectAPIKeyServiceController,
  PROJECT_AP_IKEY_SERVICE_NAME,
  CreateProjectAPIKeyRequest,
  FindProjectAPIKeyListRequest,
  UpdateProjectAPIKeyRequest,
  DeleteProjectAPIKeyRequest,
  ProjectAPIKey,
  VoidResponse,
  FindProjectAPIKeyListResponse,
  FindProjectAPIKeyRequest,
} from '@coblocks/proto';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class ProjectApikeyController implements ProjectAPIKeyServiceController {
  private readonly logger = new Logger(ProjectApikeyController.name);

  constructor(private readonly projectApikeyService: ProjectApikeyService) {}

  @GrpcMethod(PROJECT_AP_IKEY_SERVICE_NAME, 'createProjectApiKey')
  async createProjectApiKey(req: CreateProjectAPIKeyRequest): Promise<ProjectAPIKey> {
    const projectApiKey = await this.projectApikeyService.createProjectAPIKey(req);
    return {
      id: projectApiKey.id.toString(),
      projectId: projectApiKey.project_id.toString(),
      permission: projectApiKey.permission,
      apiKey: projectApiKey.api_key,
      roomList: projectApiKey.room_list.toString(),
      status: projectApiKey.status ? 1 : 0,
      createdTime: projectApiKey.create_time.toISOString(),
      updatedTime: projectApiKey.update_time.toISOString(),
    };
  }

  @GrpcMethod(PROJECT_AP_IKEY_SERVICE_NAME, 'updateProjectApiKey')
  async updateProjectApiKey(req: UpdateProjectAPIKeyRequest): Promise<ProjectAPIKey> {
    const projectApiKey = await this.projectApikeyService.updateProjectAPIKey(req);
    return {
      id: projectApiKey.id.toString(),
      projectId: projectApiKey.project_id.toString(),
      permission: projectApiKey.permission,
      apiKey: projectApiKey.api_key,
      roomList: projectApiKey.room_list.toString(),
      status: projectApiKey.status ? 1 : 0,
      createdTime: projectApiKey.create_time.toISOString(),
      updatedTime: projectApiKey.update_time.toISOString(),
    };
  }

  @GrpcMethod(PROJECT_AP_IKEY_SERVICE_NAME, 'deleteProjectApiKey')
  async deleteProjectApiKey(req: DeleteProjectAPIKeyRequest): Promise<VoidResponse> {
    try {
      await this.projectApikeyService.deleteProjectAPIKey(req);
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

  @GrpcMethod(PROJECT_AP_IKEY_SERVICE_NAME, 'findProjectApiKeyList')
  async findProjectApiKeyList(
    req: FindProjectAPIKeyListRequest,
  ): Promise<FindProjectAPIKeyListResponse> {
    const { data, total } = await this.projectApikeyService.findProjectApiKeyList(req);
    return {
      data: data.map((projectApiKey) => {
        return {
          id: projectApiKey.id.toString(),
          projectId: projectApiKey.project_id.toString(),
          permission: projectApiKey.permission,
          apiKey: projectApiKey.api_key,
          roomList: projectApiKey.room_list.toString(),
          status: projectApiKey.status ? 1 : 0,
          createdTime: projectApiKey.create_time.toISOString(),
          updatedTime: projectApiKey.update_time.toISOString(),
        };
      }),
      total,
    };
  }

  @GrpcMethod(PROJECT_AP_IKEY_SERVICE_NAME, 'findProjectApiKey')
  async findProjectApiKey(request: FindProjectAPIKeyRequest): Promise<ProjectAPIKey> {
    const projectApiKey = await this.projectApikeyService.findProjectAPIKey(request);
    return {
      id: projectApiKey.id.toString(),
      projectId: projectApiKey.project_id.toString(),
      permission: projectApiKey.permission,
      apiKey: projectApiKey.api_key,
      roomList: projectApiKey.room_list.toString(),
      status: projectApiKey.status ? 1 : 0,
      createdTime: projectApiKey.create_time.toISOString(),
      updatedTime: projectApiKey.update_time.toISOString(),
    };
  }
}
