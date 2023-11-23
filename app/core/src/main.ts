import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { polyfill } from '@coblocks/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const protoPath = [
    join(__dirname, 'pb/project.proto'),
    join(__dirname, 'pb/user.proto'),
    join(__dirname, 'pb/room.proto'),
  ];
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: ['project', 'user', 'room'],
      protoPath,
    },
  });

  await app.listen();
}

polyfill();
bootstrap();
