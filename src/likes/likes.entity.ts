import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';

import { UserEntity } from 'src/users/user.entity';
import { ReviewEntity } from 'src/reviews/review.entity';

@Entity()
export class LikesEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.likeList, {
    eager: false,
  })
  user: UserEntity;

  @ManyToOne(() => ReviewEntity, (review: ReviewEntity) => review.likeList, {
    eager: false,
    onDelete: 'CASCADE',
  })
  review: ReviewEntity;
}
