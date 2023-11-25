import { Test, TestingModule } from '@nestjs/testing';
import { RoomMetadataService } from './room-metadata.service';

describe('RoomMetadataService', () => {
  let service: RoomMetadataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomMetadataService],
    }).compile();

    service = module.get<RoomMetadataService>(RoomMetadataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
