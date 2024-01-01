import type { Pagination } from 'src/types/pagination';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  Delete,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { UserEntity } from 'src/users/user.entity';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

import { GetPagination } from 'src/decorators/get-pagination';

@Controller('reviews')
@UseGuards(AuthGuard())
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get()
  getReviewList(
    @GetPagination() pagination: Pagination,
    @GetUser() user: UserEntity,
  ) {
    return this.reviewsService.getReviewList(pagination, user);
  }

  @Get('/:reviewId')
  getReviewOne(@Param('reviewId', ParseIntPipe) reviewId: number) {
    return this.reviewsService.getReviewItem(reviewId);
  }

  // @Get('')
  // getReviewListByIsbn(@Query('isbn') isbn: string) {
  //   return this.reviewsService.getReviewListByIsbn(isbn);
  // }

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

  @Patch('/:reviewId')
  updateReview(
    @Param('reviewId', ParseIntPipe) reviewId: number,
    @Body(ValidationPipe) updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewsService.updateReview(reviewId, updateReviewDto);
  }

  @Delete('/:reviewId')
  deleteReview(@Param('reviewId', ParseIntPipe) reviewId: number) {
    return this.reviewsService.deleteReview(reviewId);
  }
}
