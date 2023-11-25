import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { IsEnum, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { Environment } from '@coblocks/common';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(30)
  name?: string;

  @MaxLength(200)
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(10)
  @IsEnum(Environment)
  environment?: string;
}
