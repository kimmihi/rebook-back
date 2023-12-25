import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class RegisterReadingBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  contents: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  translator: string;

  @IsString()
  @IsNotEmpty()
  isbn: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  sale_price: number;

  @IsString()
  @IsNotEmpty()
  publisher: string;

  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @IsString()
  @IsNotEmpty()
  datetime: string;
}
