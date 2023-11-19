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

@Controller('comments')
@UseGuards(AuthGuard())
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post('/:reviewId')
  createComment(
    @Param('reviewId', ParseIntPipe) reviewId: number,
    @Body(ValidationPipe) createCommentDto: CreateCommentDto,
    @GetUser() user: UserEntity,
  ) {
    return this.commentsService.createComment(reviewId, createCommentDto, user);
  }
}
