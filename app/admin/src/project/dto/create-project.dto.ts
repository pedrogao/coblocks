import { Environment } from '@coblocks/common';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsEnum, MaxLength } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @MaxLength(30)
  name: string;

  @MaxLength(200)
  @IsOptional()
  description: string;

  @IsNotEmpty()
  @MaxLength(10)
  @Transform(({ value }) => ('' + value).toLowerCase())
  // @Matches(
  //   `^${Object.values(Environment)
  //     .filter((v) => typeof v !== 'number')
  //     .join('|')}$`,
  //   'i',
  // )
  @IsEnum(Environment)
  environment: string;
}
