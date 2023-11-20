import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Hero } from '../../proto/hero';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Observable<Hero> {
    return this.appService.getHero();
  }
}
