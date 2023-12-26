import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @MinLength(200)
  content: string;

  @IsNotEmpty()
  bookId: number;
}
