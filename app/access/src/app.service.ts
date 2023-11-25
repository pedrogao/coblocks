import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Project, ProjectServiceClient, PROJECT_SERVICE_NAME } from '@coblocks/proto';

@Injectable()
export class AppService implements OnModuleInit {
  private projectService: ProjectServiceClient;

  constructor(@Inject('project') private client: ClientGrpc) {}

  onModuleInit() {
    this.projectService = this.client.getService<ProjectServiceClient>(PROJECT_SERVICE_NAME);
  }

  async getProjectList(creatorId: string): Promise<Project[]> {
    // TODO: add pagination
    return this.projectService
      .findProjectList({ creatorId, limit: 10, offset: 0 })
      .toPromise()
      .then((res) => res.data);
  }
}
