import { Module } from '@nestjs/common';
import { RoomHookService } from './room-hook.service';
import { RoomHookController } from './room-hook.controller';
import { PrismaService } from '../dao/prisma.service';

@Module({
  controllers: [RoomHookController],
  providers: [RoomHookService, PrismaService],
})
export class RoomHookModule {}
