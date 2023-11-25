import { Module } from '@nestjs/common';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { RoomDocModule } from './room-doc/room-doc.module';
import { RoomHookModule } from './room-hook/room-hook.module';
import { RoomMetadataModule } from './room-metadata/room-metadata.module';
import { ProjectApikeyModule } from './project-apikey/project-apikey.module';

@Module({
  imports: [
    ProjectModule,
    UserModule,
    RoomModule,
    RoomDocModule,
    RoomHookModule,
    RoomMetadataModule,
    ProjectApikeyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
