import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';

import { UserEntity } from './user.entity';

@Entity()
export class FollowEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  follower_id: number;

  @Column()
  followee_id: number;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.followerList, {
    eager: false,
  })
  @JoinColumn({ name: 'follower_id' })
  follower: UserEntity;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.followeeList, {
    eager: false,
  })
  @JoinColumn({ name: 'followee_id' })
  followee: UserEntity;
}
