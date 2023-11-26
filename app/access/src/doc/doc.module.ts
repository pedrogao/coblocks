import { Module } from '@nestjs/common';
import { DocService } from './doc.service';
import { DocGateway } from './doc.gateway';

@Module({
  providers: [DocGateway, DocService]
})
export class DocModule {}
