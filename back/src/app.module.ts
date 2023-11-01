import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { typeORMConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), AuthModule, ReviewsModule],
})
export class AppModule {}
