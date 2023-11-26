import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocModule } from './doc/doc.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),

    ClientsModule.register([
      {
        name: 'project',
        transport: Transport.GRPC,
        options: {
          package: ['project'],
          protoPath: [join(__dirname, 'pb/project.proto')],
        },
      },
    ]),

    DocModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
