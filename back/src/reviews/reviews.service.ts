import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Review } from './review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async createReview(
    createReviewDto: CreateReviewDto,
    user: User,
  ): Promise<Review> {
    const { title, content, book } = createReviewDto;

    const newReview = this.reviewRepository.create({
      title,
      content,
      book,
      user,
    });

    await this.reviewRepository.save(newReview);
    return newReview;
  }
}
