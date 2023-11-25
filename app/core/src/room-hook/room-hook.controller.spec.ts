import { Test, TestingModule } from '@nestjs/testing';
import { RoomHookController } from './room-hook.controller';
import { RoomHookService } from './room-hook.service';

describe('RoomHookController', () => {
  let controller: RoomHookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomHookController],
      providers: [RoomHookService],
    }).compile();

    controller = module.get<RoomHookController>(RoomHookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
