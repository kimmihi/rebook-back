import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { LikesEntity } from './likes.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([LikesEntity]), AuthModule],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
