import { IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class UpdateReviewDto {
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @IsNotEmpty()
  @MinLength(200)
  @IsOptional()
  content: string;

  @IsNotEmpty()
  @IsOptional()
  isbn: string;
}
