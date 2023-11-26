import { Test, TestingModule } from '@nestjs/testing';
import { DocGateway } from './doc.gateway';
import { DocService } from './doc.service';

describe('DocGateway', () => {
  let gateway: DocGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocGateway, DocService],
    }).compile();

    gateway = module.get<DocGateway>(DocGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
