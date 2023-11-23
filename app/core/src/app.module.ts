import { Module } from '@nestjs/common';
import { ProjectModule } from './project.module';
import { UserModule } from './user.module';
import { RoomModule } from './room.module';

@Module({
  imports: [ProjectModule, UserModule, RoomModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
