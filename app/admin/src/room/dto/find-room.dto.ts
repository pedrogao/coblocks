import { Type } from 'class-transformer';
import { Min, IsInt, IsOptional } from 'class-validator';

export class FindRoomDto {
  @IsInt()
  @Type(() => Number)
  @Min(1)
  limit: number;

  @IsInt()
  @Type(() => Number)
  @Min(0)
  page: number;

  @IsInt()
  @Type(() => Number)
  @Min(0)
  offset: number;

  @IsOptional()
  s?: string;

  @IsOptional()
  sort?: string[];
}
