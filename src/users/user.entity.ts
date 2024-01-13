import type { Gender } from 'src/types/user';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { FollowEntity } from './follow.entity';
import { LikesEntity } from 'src/likes/likes.entity';
import { ReviewEntity } from 'src/reviews/review.entity';
import { BookEntity } from 'src/books/book.entity';

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: Gender;

  @Column()
  dateOfBirth: string;

  @Column()
  email: string;

  @Column()
  userId: string;

  @OneToMany(() => FollowEntity, (follow: FollowEntity) => follow.follower)
  followerList: FollowEntity[];

  @OneToMany(() => FollowEntity, (follow: FollowEntity) => follow.followee)
  followeeList: FollowEntity[];

  @OneToMany(() => ReviewEntity, (review: ReviewEntity) => review.user)
  bookList: BookEntity[];

  @OneToMany(() => LikesEntity, (likes: LikesEntity) => likes.user)
  likeList: LikesEntity[];
}
