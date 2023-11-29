import { Inject, Injectable } from '@nestjs/common';
import { ProjectAPIKeyServiceClient, PROJECT_AP_IKEY_SERVICE_NAME } from '@coblocks/proto';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class ProjectApikeyService {
  private rpcClient: ProjectAPIKeyServiceClient;

  constructor(@Inject('access') private client: ClientGrpc) {}

  onModuleInit() {
    this.rpcClient = this.client.getService<ProjectAPIKeyServiceClient>(
      PROJECT_AP_IKEY_SERVICE_NAME,
    );
  }

  async findByApiKey(apiKey: string) {
    const resp = await this.rpcClient
      .findProjectApiKey({
        apiKey,
      })
      .toPromise();

    return {
      id: resp.id,
      projectId: resp.projectId,
      permission: resp.permission,
      apiKey: resp.apiKey,
      roomList: resp.roomList,
      status: resp.status === 1,
      createdTime: resp.createdTime,
      updatedTime: resp.updatedTime,
    };
  }
}
