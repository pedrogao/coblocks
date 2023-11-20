import { Module } from '@nestjs/common';
import { ProjectService } from './dao/project.service';
import { PrismaService } from './dao/prisma.service';
import { ProjectController } from './project.controller';

@Module({
  imports: [],
  controllers: [ProjectController],
  providers: [ProjectService, PrismaService],
})
export class ProjectModule {}
