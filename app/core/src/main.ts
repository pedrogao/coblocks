import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { polyfill } from '@coblocks/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const protoPath = [
    join(__dirname, 'pb/common.proto'),
    join(__dirname, 'pb/project.proto'),
    join(__dirname, 'pb/user.proto'),
    join(__dirname, 'pb/room.proto'),
    join(__dirname, 'pb/room-doc.proto'),
    join(__dirname, 'pb/room-hook.proto'),
    join(__dirname, 'pb/room-metadata.proto'),
    join(__dirname, 'pb/project-api-key.proto'),
  ];
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:5000',
      package: [
        'common',
        'project',
        'user',
        'room',
        'room_doc',
        'room_hook',
        'room_metadata',
        'project_api_key',
      ],
      protoPath,
    },
  });

  await app.listen();
}

polyfill();
bootstrap();
