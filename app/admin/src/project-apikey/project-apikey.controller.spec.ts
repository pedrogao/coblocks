import { Test, TestingModule } from '@nestjs/testing';
import { ProjectApikeyController } from './project-apikey.controller';
import { ProjectApikeyService } from './project-apikey.service';

describe('ProjectApikeyController', () => {
  let controller: ProjectApikeyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectApikeyController],
      providers: [ProjectApikeyService],
    }).compile();

    controller = module.get<ProjectApikeyController>(ProjectApikeyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
