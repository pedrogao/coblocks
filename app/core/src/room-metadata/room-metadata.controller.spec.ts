import { Test, TestingModule } from '@nestjs/testing';
import { RoomMetadataController } from './room-metadata.controller';
import { RoomMetadataService } from './room-metadata.service';

describe('RoomMetadataController', () => {
  let controller: RoomMetadataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomMetadataController],
      providers: [RoomMetadataService],
    }).compile();

    controller = module.get<RoomMetadataController>(RoomMetadataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
