import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';
import { BookEntity } from 'src/books/book.entity';
import { FollowEntity } from './follow.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, FollowEntity, BookEntity]),
    AuthModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UserEntity],
})
export class UsersModule {}
