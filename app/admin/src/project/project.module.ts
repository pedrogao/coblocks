import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'project',
        transport: Transport.GRPC,
        options: {
          url: process.env.GRPC_URL || 'localhost:5000',
          package: ['project'],
          protoPath: [join(__dirname, '../', 'pb/project.proto')],
        },
      },
    ]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
