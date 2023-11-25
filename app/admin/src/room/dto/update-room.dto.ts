import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomDto } from './create-room.dto';
import { IsOptional, Matches } from 'class-validator';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
  @IsOptional()
  @Matches(/^(Opened|Closed)$/)
  status?: string;
}
