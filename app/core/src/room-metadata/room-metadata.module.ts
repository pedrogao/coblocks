import { Module } from '@nestjs/common';
import { RoomMetadataService } from './room-metadata.service';
import { RoomMetadataController } from './room-metadata.controller';
import { PrismaService } from '../dao/prisma.service';

@Module({
  controllers: [RoomMetadataController],
  providers: [RoomMetadataService, PrismaService],
})
export class RoomMetadataModule {}
