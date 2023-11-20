import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  Project,
  ProjectServiceClient,
  PROJECT_SERVICE_NAME,
  PROJECT_PACKAGE_NAME,
} from '@coblocks/proto';

@Injectable()
export class AppService implements OnModuleInit {
  private projectService: ProjectServiceClient;

  constructor(@Inject(PROJECT_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.projectService = this.client.getService<ProjectServiceClient>(PROJECT_SERVICE_NAME);
  }

  async getProjectList(creatorId: number): Promise<Project[]> {
    return this.projectService
      .findProjectList({ creatorId })
      .toPromise()
      .then((res) => res.projects);
  }
}
