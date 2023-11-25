import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Project } from '@coblocks/proto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(['', '/'])
  index(): string {
    return 'Hello World!';
  }

  @Get('/project/:creatorId')
  async getProjectList(@Param('creatorId') creatorId: string): Promise<Project[]> {
    return this.appService.getProjectList(creatorId);
  }
}
