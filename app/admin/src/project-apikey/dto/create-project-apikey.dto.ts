import { IsNotEmpty, IsOptional, Matches, IsArray } from 'class-validator';

export class CreateProjectApikeyDto {
  @IsNotEmpty()
  projectId: string;

  @IsOptional()
  @Matches(/^(ReadOnly|ReadWrite)$/)
  permission?: string;

  @IsNotEmpty()
  @IsArray()
  roomList: string[];
}
