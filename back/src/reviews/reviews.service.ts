import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ReviewEntity } from './review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UserEntity } from 'src/users/user.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,
  ) {}

  async getReviewListByIsbn(isbn: string) {
    const reviewList = await this.reviewRepository.find({ where: { isbn } });
    return reviewList;
  }

  async createReview(createReviewDto: CreateReviewDto, user: UserEntity) {
    const { title, content, isbn } = createReviewDto;
    const newReview = this.reviewRepository.create({
      title,
      content,
      isbn,
      user,
    });

    await this.reviewRepository.save(newReview);

    return newReview;
  }
}
