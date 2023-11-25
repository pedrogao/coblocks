import { Test, TestingModule } from '@nestjs/testing';
import { RoomHookService } from './room-hook.service';

describe('RoomHookService', () => {
  let service: RoomHookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomHookService],
    }).compile();

    service = module.get<RoomHookService>(RoomHookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
