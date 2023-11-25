import { Module } from '@nestjs/common';
import { PrismaService } from '../dao/prisma.service';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';

@Module({
  imports: [],
  controllers: [ProjectController],
  providers: [ProjectService, PrismaService],
})
export class ProjectModule {}
