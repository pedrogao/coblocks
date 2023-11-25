import { Module } from '@nestjs/common';
import { PrismaService } from '../dao/prisma.service';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
  imports: [],
  controllers: [RoomController],
  providers: [RoomService, PrismaService],
})
export class RoomModule {}
