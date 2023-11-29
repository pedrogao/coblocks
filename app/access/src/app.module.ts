import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { AppController } from './app.controller';
import { DocGateway } from './doc/doc.gateway';
import configuration from './config/configuration';
import { RoomService } from './service/room.service';
import { Storage } from './extensions/storage';
import { Auth } from './extensions/auth';
import { ProjectService } from './service/project.service';
import { ProjectApikeyService } from './service/project-apikey.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),

    ClientsModule.register([
      {
        name: 'access',
        transport: Transport.GRPC,
        options: {
          url: process.env.GRPC_URL || 'localhost:5000',
          package: ['room', 'room_doc', 'room_hook', 'room_metadata', 'project', 'project_api_key'],
          protoPath: [
            join(__dirname, 'pb/room.proto'),
            join(__dirname, 'pb/room-doc.proto'),
            join(__dirname, 'pb/room-hook.proto'),
            join(__dirname, 'pb/room-metadata.proto'),
            join(__dirname, 'pb/project.proto'),
            join(__dirname, 'pb/project-api-key.proto'),
          ],
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [DocGateway, Storage, Auth, RoomService, ProjectService, ProjectApikeyService],
})
export class AppModule {}
