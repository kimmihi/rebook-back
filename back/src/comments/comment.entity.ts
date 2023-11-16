import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
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
    },
  )
  review: ReviewEntity;
}
