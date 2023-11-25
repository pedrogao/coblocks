import { Type } from 'class-transformer';
import { Min, IsInt } from 'class-validator';

export class FindProjectDto {
  @IsInt()
  @Type(() => Number)
  @Min(1)
  limit: number;

  @IsInt()
  @Type(() => Number)
  @Min(0)
  offset: number;
}
