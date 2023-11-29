import { Repository } from 'typeorm';
import { Injectable, HttpStatus, ConflictException } from '@nestjs/common';
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
    const me = await this.userRepository.findOne({ where: { id: user.id } });

    const hasFollow = me.followee_list.find(({ id }) => id === followerId);
    if (hasFollow) {
      throw new ConflictException('이미 팔로우하고 있습니다.');
    }

    const newFollow = this.followRepository.create({
      followee_id: user.id,
      follower_id: followerId,
    });

    await this.followRepository.save(newFollow);

    return HttpStatus.OK;
  }
}
