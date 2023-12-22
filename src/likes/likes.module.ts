import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { LikesEntity } from './likes.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ReviewEntity } from 'src/reviews/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LikesEntity, ReviewEntity]), AuthModule],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
