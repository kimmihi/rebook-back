import { Body, Controller, Post } from '@nestjs/common';

import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/decorator/get-user.decorator';

import { Review } from './review.entity';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Post('/')
  createReview(
    @Body() createReviewDto: CreateReviewDto,
    @GetUser() user: User,
  ): Promise<Review> {
    return this.reviewsService.createReview(createReviewDto, user);
  }
}
