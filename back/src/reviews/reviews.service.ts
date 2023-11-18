import { Injectable, ForbiddenException, HttpCode } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ReviewEntity } from './review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { UserEntity } from 'src/users/user.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getReviewOne(reviewId: number) {
    const review = await this.reviewRepository.findOne({
      where: { id: reviewId },
    });

    return review;
  }

  async getReviewListByIsbn(isbn: string) {
    const reviewList = await this.reviewRepository.find({ where: { isbn } });
    return reviewList;
  }

  async getReviewListByFollowUser(user: UserEntity) {
    const me = await this.userRepository.findOne({
      where: { id: user.id },
    });

    const followerList = me.followee_list.map((value) => value.follower_id);
    const result = [];
    for (const followerId of followerList) {
      const reviewList = await this.reviewRepository.find({
        where: { user: { id: followerId } },
      });
      result.push(...reviewList);
    }

    return result;
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

  async updateReview(reviewId: number, updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewRepository.findOne({
      where: { id: reviewId },
    });

    if (!review) {
      throw new ForbiddenException();
    }

    const updatedReview = {
      ...review,
      ...updateReviewDto,
    };

    await this.reviewRepository.save(updatedReview);

    return review;
  }

  async deleteReview(reviewId: number) {
    const review = await this.reviewRepository.findOne({
      where: { id: reviewId },
    });

    if (!review) {
      throw new ForbiddenException();
    }

    await this.reviewRepository.softDelete({ id: reviewId });
    return HttpCode(200);
  }
}
