import { IsNotEmpty, MinLength } from 'class-validator';

export class Book {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
}

export class CreateReviewDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @MinLength(200)
  content: string;

  @IsNotEmpty()
  book: Book;
}
