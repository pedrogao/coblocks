import { Body, Controller, Get, Post, Request, InternalServerErrorException } from '@nestjs/common';
import { Request as RawRequest } from 'express';
import { UserService } from './user.service';
import { Public } from '../decorator/public.decorator';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  public constructor(private userService: UserService) {}

  @Get('profile')
  async getProfile(@Request() req: RawRequest & { user: any }) {
    return {
      id: req.user.id,
      username: req.user.username,
      role: req.user.role,
    };
  }

  @Public()
  @Post()
  async create(@Body() dto: CreateUserDto) {
    const user = await this.userService.create(dto);
    if (!user) {
      throw new InternalServerErrorException('Create user failed');
    }
    return {
      id: user.id,
      username: user.name,
      role: user.role,
    };
  }
}
