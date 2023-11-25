import { Module } from '@nestjs/common';
import { ProjectApikeyService } from './project-apikey.service';
import { ProjectApikeyController } from './project-apikey.controller';
import { PrismaService } from '../dao/prisma.service';

@Module({
  controllers: [ProjectApikeyController],
  providers: [ProjectApikeyService, PrismaService],
})
export class ProjectApikeyModule {}
