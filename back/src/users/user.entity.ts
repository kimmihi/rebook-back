import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { FollowEntity } from './follow.entity';
import { ReviewEntity } from 'src/reviews/review.entity';
import { CommentEntity } from 'src/comments/comment.entity';

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => FollowEntity, (follow: FollowEntity) => follow.follower, {
    eager: true,
  })
  follower_list: FollowEntity[];

  @OneToMany(() => FollowEntity, (follow: FollowEntity) => follow.followee, {
    eager: true,
  })
  followee_list: FollowEntity[];

  @OneToMany(() => ReviewEntity, (review: ReviewEntity) => review.user, {
    eager: true,
  })
  review_list: ReviewEntity[];

  @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.writer, {
    eager: true,
  })
  comment_list: CommentEntity[];
}
