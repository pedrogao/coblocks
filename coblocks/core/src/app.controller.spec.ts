import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './dao/prisma.service';
import { Hero } from '../../proto/hero';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, PrismaService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return Hero', async () => {
      const hero: Hero = (await appController.findOne({ id: 1 })) as Hero;
      expect(hero.id).toBe(1);
      expect(hero.name).toBe('pedro');
    });
  });
});
