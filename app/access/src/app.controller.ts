import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Project } from '@coblocks/proto';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Observable<Project> {
    return this.appService.getProject();
  }
}
