import { IsNotEmpty, IsOptional, Matches, MaxLength } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  projectId: string;

  @IsOptional()
  @Matches(/^(Opened|Closed)$/)
  status?: string;
}
