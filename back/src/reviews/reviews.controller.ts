import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { UserEntity } from 'src/users/user.entity';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
@UseGuards(AuthGuard)
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get('')
  getReviewListByIsbn(@Query('isbn') isbn: string) {
    return this.reviewsService.getReviewListByIsbn(isbn);
  }

  @Get('/followee')
  getReviewListByFollowUser(@GetUser() user: UserEntity) {
    return this.reviewsService.getReviewListByFollowUser(user);
  }

  @Post('')
  createReview(
    @Body(ValidationPipe) createReviewDto: CreateReviewDto,
    @GetUser() user: UserEntity,
  ) {
    return this.reviewsService.createReview(createReviewDto, user);
  }
}
