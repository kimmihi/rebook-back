import type { Gender } from 'src/types/user';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  dateOfBirth: string;

  @IsString()
  gender: Gender;

  @IsString()
  @MinLength(4)
  @MaxLength(12)
  userId: string;

  @IsString()
  @Matches(
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
    {
      message: 'Invalid Email',
    },
  )
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
