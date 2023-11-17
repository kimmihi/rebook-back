import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity, ChildCommentEntity } from './comment.entity';
@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, ChildCommentEntity])],
})
export class CommentsModule {}
