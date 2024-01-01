import { IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  userId: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
