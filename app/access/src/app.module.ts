import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { PROJECT_PACKAGE_NAME, protobufPackage } from '@coblocks/proto';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),

    ClientsModule.register([
      {
        name: PROJECT_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: [protobufPackage],
          protoPath: [join(__dirname, 'pb/project.proto')],
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
