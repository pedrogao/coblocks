import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from '../dao/prisma.service';
import { UserController } from './user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
