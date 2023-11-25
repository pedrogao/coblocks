import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../dao/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findUser(name: string): Promise<User> {
    return this.prismaService.user.findFirst({
      where: {
        name,
      },
    });
  }

  async createUser({
    name,
    password,
    role,
  }: {
    name: string;
    password: string;
    role: number;
  }): Promise<User> {
    return this.prismaService.user.create({
      data: {
        name,
        password,
        role,
      },
    });
  }

  async updateUserPassword({ name, password }: { name: string; password: string }) {
    return this.prismaService.user.update({
      // @ts-ignore
      where: {
        name,
      },
      data: {
        password,
      },
    });
  }
}
