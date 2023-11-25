import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
  Req,
} from '@nestjs/common';
import { Request as RawRequest } from 'express';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { FindRoomDto } from './dto/find-room.dto';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  async create(@Body() createRoomDto: CreateRoomDto, @Req() req: RawRequest & { user: any }) {
    const createId = req.user.id;
    return this.roomService.create(createRoomDto, createId);
  }

  @Get()
  async findMany(@Query() query: FindRoomDto, @Request() req: RawRequest & { user: any }) {
    const creatorId = req.user.id;
    return this.roomService.findMany(query, creatorId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.roomService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(id, updateRoomDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.roomService.remove(id);
  }
}
