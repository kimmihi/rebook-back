import { HttpCode, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LikesEntity } from './likes.entity';
import { ReviewEntity } from 'src/reviews/review.entity';
import { UserEntity } from 'src/users/user.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(LikesEntity)
    private likesRepository: Repository<LikesEntity>,
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,
  ) {}

  async likeReviwe(reviewId: number, user: UserEntity) {
    const review = await this.reviewRepository.findOne({
      where: { id: reviewId },
    });

    const newLike = this.likesRepository.create({
      user,
      review,
    });

    await this.likesRepository.save(newLike);
    return HttpCode(200);
  }
}
