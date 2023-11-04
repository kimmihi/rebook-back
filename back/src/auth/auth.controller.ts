import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './user.entity';
import { GetUser } from './decorator/get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<User> {
    return this.authService.createUser(createUserDto);
  }

  @Post('/signin')
  signIn(@Body() loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(loginUserDto);
  }

  @Post('/following/:userId')
  follow(@Param('userId', ParseIntPipe) userId: number, @GetUser() user: User) {
    this.authService.follow(userId, user);
  }
}
