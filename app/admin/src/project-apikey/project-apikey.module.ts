import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ProjectApikeyService } from './project-apikey.service';
import { ProjectApikeyController } from './project-apikey.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'project-api-key',
        transport: Transport.GRPC,
        options: {
          package: ['common', 'project_api_key'],
          protoPath: [
            join(__dirname, '../', 'pb/common.proto'),
            join(__dirname, '../', 'pb/project-api-key.proto'),
          ],
        },
      },
    ]),
    AuthModule,
  ],
  controllers: [ProjectApikeyController],
  providers: [ProjectApikeyService],
})
export class ProjectApikeyModule {}
