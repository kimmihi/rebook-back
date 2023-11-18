import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Entity,
} from 'typeorm';

import { ReviewEntity } from 'src/reviews/review.entity';
import { UserEntity } from 'src/users/user.entity';

@Entity()
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.comment_list, {
    eager: false,
  })
  writer: UserEntity;

  @ManyToOne(
    () => ReviewEntity,
    (review: ReviewEntity) => review.comment_list,
    {
      eager: false,
      onDelete: 'CASCADE',
    },
  )
  review: ReviewEntity;

  @OneToMany(
    () => ChildCommentEntity,
    (childComment: ChildCommentEntity) => childComment.parent_comment,
    { eager: true, cascade: true },
  )
  child_comment_list: ChildCommentEntity[];
}

@Entity()
export class ChildCommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.comment_list, {
    eager: false,
  })
  writer: UserEntity;

  @ManyToOne(
    () => ReviewEntity,
    (review: ReviewEntity) => review.comment_list,
    {
      eager: false,
      onDelete: 'CASCADE',
    },
  )
  review: ReviewEntity;

  @ManyToOne(
    () => CommentEntity,
    (comment: CommentEntity) => comment.child_comment_list,
    { eager: false, onDelete: 'CASCADE' },
  )
  parent_comment: CommentEntity;
}
