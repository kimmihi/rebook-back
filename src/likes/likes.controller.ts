import {
  Controller,
  Post,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LikesService } from './likes.service';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { UserEntity } from 'src/users/user.entity';

@Controller('likes')
@UseGuards(AuthGuard())
export class LikesController {
  constructor(private likesService: LikesService) {}

  @Post('/reviews/:reviewId')
  likeReview(
    @Param('reviewId', ParseIntPipe) reviewId: number,
    @GetUser() user: UserEntity,
  ) {
    return this.likesService.likeReviwe(reviewId, user);
  }
}
