import { Type } from 'class-transformer';
import { Min, IsInt } from 'class-validator';
/**
 * limit=10&page=1&offset=0
 */
export class FindProjectDto {
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

  @IsInt()
  @Type(() => Number)
  @Min(0)
  creatorId: number;
}
