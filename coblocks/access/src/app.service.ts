import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  Hero,
  HeroesServiceClient,
  HEROES_SERVICE_NAME,
  HERO_PACKAGE_NAME,
} from '../../proto/hero';

@Injectable()
export class AppService implements OnModuleInit {
  private heroesService: HeroesServiceClient;

  constructor(@Inject(HERO_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.heroesService = this.client.getService<HeroesServiceClient>(HEROES_SERVICE_NAME);
  }

  getHero(): Observable<Hero> {
    return this.heroesService.findOne({ id: 1 });
  }
}
