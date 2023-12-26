import type { Pagination } from 'src/types/pagination';

import { Injectable, ForbiddenException, HttpCode } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Not, Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewEntity } from './review.entity';
import { UserEntity } from 'src/users/user.entity';
import { BookEntity } from 'src/books/book.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
  ) {}

  async getReviewList(pagination: Pagination, user: UserEntity) {
    const { page, size } = pagination;
    const [reviewList, total] = await this.reviewRepository.findAndCount({
      take: size,
      skip: (page - 1) * size,
      where: { user_id: Not(user.id) },
    });

    const userList = await this.userRepository.find();

    const mappedReviewList = reviewList.map((review) => {
      const user = userList.find((user) => user.id === review.user_id);
      const { username } = user;
      return {
        ...review,
        username,
      };
    });

    return {
      data: mappedReviewList,
      page,
      size,
      total,
      totalPages: Math.ceil(total / size),
    };
  }

  async getReviewOne(reviewId: number) {
    const review = await this.reviewRepository.findOne({
      where: { id: reviewId },
    });

    const book = await this.bookRepository.findOne({
      where: { id: review.book_id },
    });

    return { review, book };
  }

  async getReviewListByFollowUser(user: UserEntity) {
    const me = await this.userRepository.findOne({
      where: { id: user.id },
    });

    const followerList = me.followee_list.map((value) => value.follower_id);
    const result = [];
    for (const followerId of followerList) {
      const reviewList = await this.reviewRepository.find({
        where: { user_id: followerId },
      });
      result.push(...reviewList);
    }

    return result;
  }

  async createReview(createReviewDto: CreateReviewDto, user: UserEntity) {
    const { title, content, bookId } = createReviewDto;
    const newReview = this.reviewRepository.create({
      title,
      content,
      book_id: bookId,
      user_id: user.id,
    });

    await this.bookRepository.update(bookId, { status: 'DONE' });
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
