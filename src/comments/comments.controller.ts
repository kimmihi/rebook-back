import {
  Controller,
  Param,
  Post,
  Body,
  UseGuards,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { UserEntity } from 'src/users/user.entity';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('')
@UseGuards(AuthGuard())
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post('/reviews/:reviewId')
  createComment(
    @Param('reviewId', ParseIntPipe) reviewId: number,
    @Body(ValidationPipe) createCommentDto: CreateCommentDto,
    @GetUser() user: UserEntity,
  ) {
    return this.commentsService.createComment(reviewId, createCommentDto, user);
  }

  // @Post('/reviews/:reviewId/comments/:parentCommentId')
  // createChildComment(
  //   @Param('reviewId', ParseIntPipe) reviewId: number,
  //   @Param('parentCommentId', ParseIntPipe) parentCommentId: number,
  //   @Body(ValidationPipe) createCommentDt: CreateCommentDto,
  //   @GetUser() user: UserEntity,
  // ) {
  //   return this.commentsService.createChildComment(
  //     reviewId,
  //     parentCommentId,
  //     createCommentDt,
  //     user,
  //   );
  // }
}
