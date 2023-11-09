import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from './user.entity';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/follow/:followId')
  follow(
    @Param('followId', ParseIntPipe) followId: number,
    @GetUser() user: UserEntity,
  ) {
    return this.userService.follow(followId, user);
  }
}
