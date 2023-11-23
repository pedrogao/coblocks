import { IsNotEmpty, MaxLength } from 'class-validator';

export class SigninDto {
  @IsNotEmpty()
  @MaxLength(30)
  username: string;

  @MaxLength(200)
  @IsNotEmpty()
  password: string;
}
