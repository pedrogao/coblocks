import { Module } from '@nestjs/common';
import { RoomDocService } from './room-doc.service';
import { RoomDocController } from './room-doc.controller';
import { PrismaService } from '../dao/prisma.service';

@Module({
  controllers: [RoomDocController],
  providers: [RoomDocService, PrismaService],
})
export class RoomDocModule {}
