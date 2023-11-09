import { Repository } from 'typeorm';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from './user.entity';
import { FollowEntity } from './follow.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(FollowEntity)
    private followRepository: Repository<FollowEntity>,
  ) {}

  async follow(followerId: number, user: UserEntity) {
    const newFollow = this.followRepository.create({
      followee_id: user.id,
      follower_id: followerId,
    });

    await this.followRepository.save(newFollow);

    return HttpStatus.OK;
  }
}
