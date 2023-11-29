import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { PROJECT_SERVICE_NAME, ProjectServiceClient } from '@coblocks/proto';

@Injectable()
export class ProjectService implements OnModuleInit {
  private projectService: ProjectServiceClient;

  constructor(@Inject('access') private client: ClientGrpc) {}

  onModuleInit() {
    this.projectService = this.client.getService<ProjectServiceClient>(PROJECT_SERVICE_NAME);
  }

  async findOne(id: string) {
    const resp = await this.projectService
      .findProject({
        id,
      })
      .toPromise();

    return {
      id: resp.id,
      name: resp.name,
      environment: resp.environment,
      description: resp.description,
    };
  }
}
