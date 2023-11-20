import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { hashPassword } from '@coblocks/common';

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
    const hashedPassword = await hashPassword(password);
    return this.prismaService.user.create({
      data: {
        name,
        password: hashedPassword,
        role,
      },
    });
  }
}
