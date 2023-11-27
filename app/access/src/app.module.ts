import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { AppController } from './app.controller';
import { DocGateway } from './doc/doc.gateway';
import configuration from './config/configuration';
import { RoomService } from './service/room.service';
import { Storage } from './extensions/storage';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),

    ClientsModule.register([
      {
        name: 'room',
        transport: Transport.GRPC,
        options: {
          package: ['room', 'room_doc', 'room_hook', 'room_metadata'],
          protoPath: [
            join(__dirname, 'pb/room.proto'),
            join(__dirname, 'pb/room-doc.proto'),
            join(__dirname, 'pb/room-hook.proto'),
            join(__dirname, 'pb/room-metadata.proto'),
          ],
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [DocGateway, Storage, RoomService],
})
export class AppModule {}
