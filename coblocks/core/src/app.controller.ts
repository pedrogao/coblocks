import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  Hero,
  HeroById,
  HeroesServiceController,
  HeroesServiceControllerMethods,
} from '../../proto/hero';

const items = [
  {
    id: 1,
    name: 'Banana Peel',
  },
  {
    id: 2,
    name: 'Waste Paper',
  },
];

@Controller()
@HeroesServiceControllerMethods()
export class AppController implements HeroesServiceController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('HeroesService', 'FindOne')
  findOne(request: HeroById): Hero | Observable<Hero> | Promise<Hero> {
    console.log('request', request);
    const id = request.id;
    return this.appService.getUser(id).then((user) => {
      return {
        id: Number(user.id),
        name: user.name,
      } as Hero;
    });
  }
}
