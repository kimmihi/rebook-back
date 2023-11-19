import { HttpCode, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ReviewEntity } from 'src/reviews/review.entity';
import { CommentEntity } from './comment.entity';

import { CreateCommentDto } from './dto/create-comment.dto';
import { UserEntity } from 'src/users/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,
  ) {}

  async createComment(
    reviewId: number,
    createCommentDto: CreateCommentDto,
    user: UserEntity,
  ) {
    const { content } = createCommentDto;
    const review = await this.reviewRepository.findOne({
      where: { id: reviewId },
    });

    const newComment = this.commentRepository.create({
      content,
      writer: user,
      review,
    });

    await this.commentRepository.save(newComment);

    return HttpCode(200);
  }
}
