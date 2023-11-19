import { Injectable } from '@nestjs/common';
import { PrismaService } from './dao/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUser(id: number): Promise<User> {
    return this.prismaService.user.findFirst({
      where: {
        id,
      },
    });
  }
}
