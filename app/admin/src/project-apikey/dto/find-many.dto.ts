import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class FindManyDto {
  @IsInt()
  @Type(() => Number)
  @Min(1)
  limit: number;

  @IsInt()
  @Type(() => Number)
  @Min(0)
  offset: number;

  @IsOptional()
  s?: string;
}
