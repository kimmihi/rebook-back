import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity, ChildCommentEntity } from './comment.entity';
import { ReviewEntity } from 'src/reviews/review.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import {} from './comment.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity, ChildCommentEntity, ReviewEntity]),
    AuthModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService, CommentEntity],
})
export class CommentsModule {}
