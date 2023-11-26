import { Test, TestingModule } from '@nestjs/testing';
import { ProjectApikeyService } from './project-apikey.service';

describe('ProjectApikeyService', () => {
  let service: ProjectApikeyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectApikeyService],
    }).compile();

    service = module.get<ProjectApikeyService>(ProjectApikeyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
