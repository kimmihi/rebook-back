import { HttpCode, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ReviewEntity } from 'src/reviews/review.entity';
import { CommentEntity, ChildCommentEntity } from './comment.entity';

import { CreateCommentDto } from './dto/create-comment.dto';
import { UserEntity } from 'src/users/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
    @InjectRepository(ChildCommentEntity)
    private childCommentRepository: Repository<ChildCommentEntity>,
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
      user_id: user.id,
      review,
    });

    await this.commentRepository.save(newComment);

    return HttpCode(200);
  }

  // async createChildComment(
  //   reviewId: number,
  //   parentCommentId: number,
  //   createCommentDto: CreateCommentDto,
  //   user: UserEntity,
  // ) {
  //   const { content } = createCommentDto;
  //   const review = await this.reviewRepository.findOne({
  //     where: { id: reviewId },
  //   });
  //   const parentComment = await this.commentRepository.findOne({
  //     where: { id: parentCommentId },
  //   });

  //   const newChildComment = this.childCommentRepository.create({
  //     content,
  //     review,
  //     user_id: user.id,
  //     parent_comment: parentComment,
  //   });

  //   await this.childCommentRepository.save(newChildComment);

  //   return HttpCode(200);
  // }
}
