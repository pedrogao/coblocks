import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { protobufPackage } from '@coblocks/proto';

async function bootstrap() {
  const protoPath = [join(__dirname, 'pb/project.proto')];
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: [protobufPackage],
      protoPath: protoPath,
    },
  });

  await app.listen();
}
bootstrap();
