import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'room',
        transport: Transport.GRPC,
        options: {
          package: ['common', 'room', 'room_doc', 'room_hook', 'room_metadata'],
          protoPath: [
            join(__dirname, '../', 'pb/common.proto'),
            join(__dirname, '../', 'pb/room.proto'),
            join(__dirname, '../', 'pb/room-doc.proto'),
            join(__dirname, '../', 'pb/room-hook.proto'),
            join(__dirname, '../', 'pb/room-metadata.proto'),
          ],
        },
      },
    ]),
  ],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
