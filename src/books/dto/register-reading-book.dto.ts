import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsArray,
  IsDate,
} from 'class-validator';

export class RegisterReadingBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  contents: string;

  @IsArray()
  @IsNotEmpty()
  authors: string[];

  @IsArray()
  @IsNotEmpty()
  translators: string[];

  @IsString()
  @IsNotEmpty()
  isbn: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  sale_price: string;

  @IsString()
  @IsNotEmpty()
  publisher: string;

  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @IsDate()
  @IsNotEmpty()
  datetime: Date;
}
