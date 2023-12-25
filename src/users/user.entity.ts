import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { FollowEntity } from './follow.entity';
import { CommentEntity } from 'src/comments/comment.entity';
import { BookEntity } from 'src/books/book.entity';
import { LikesEntity } from 'src/likes/likes.entity';

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

  @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.writer, {
    eager: true,
  })
  comment_list: CommentEntity[];

  @OneToMany(() => BookEntity, (book: BookEntity) => book.user, { eager: true })
  book_list: BookEntity[];

  @OneToMany(() => LikesEntity, (likes: LikesEntity) => likes.user, {
    eager: true,
  })
  like_list: LikesEntity[];
}
