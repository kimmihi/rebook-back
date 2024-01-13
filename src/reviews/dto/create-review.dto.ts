import { IsNotEmpty, MinLength } from 'class-validator';
import { BookEntity } from 'src/books/book.entity';

export class CreateReviewDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @MinLength(200)
  content: string;

  @IsNotEmpty()
  book: BookEntity;
}
