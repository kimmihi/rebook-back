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

@Entity()
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  user_id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => ReviewEntity, (review: ReviewEntity) => review.commentList, {
    eager: false,
    onDelete: 'CASCADE',
  })
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

  @Column()
  user_id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // @ManyToOne(() => ReviewEntity, (review: ReviewEntity) => review.commentList, {
  //   eager: false,
  //   onDelete: 'CASCADE',
  // })
  // review: ReviewEntity;

  @ManyToOne(
    () => CommentEntity,
    (comment: CommentEntity) => comment.child_comment_list,
    { eager: false, onDelete: 'CASCADE' },
  )
  parent_comment: CommentEntity;
}
