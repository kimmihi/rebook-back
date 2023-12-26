import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { FollowEntity } from './follow.entity';
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

  @OneToMany(() => LikesEntity, (likes: LikesEntity) => likes.user, {
    eager: true,
  })
  like_list: LikesEntity[];
}
