import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { typeORMConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsModule } from './reviews/reviews.module';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule,
    ReviewsModule,
    UsersModule,
    CommentsModule,
    BooksModule,
  ],
})
export class AppModule {}
