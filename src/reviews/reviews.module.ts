import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReviewEntity } from './review.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserEntity } from 'src/users/user.entity';
import { BookEntity } from 'src/books/book.entity';
import { CommentEntity } from 'src/comments/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReviewEntity,
      UserEntity,
      BookEntity,
      CommentEntity,
    ]),
    AuthModule,
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
