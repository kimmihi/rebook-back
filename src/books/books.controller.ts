import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  UseGuards,
  ValidationPipe,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { RegisterReadingBookDto } from './dto/register-reading-book.dto';
import { BooksService } from './books.service';
import { UserEntity } from 'src/users/user.entity';

@Controller('books')
@UseGuards(AuthGuard())
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  getReadingBookList(@GetUser() user: UserEntity) {
    return this.booksService.getReadingBookList(user);
  }

  @Post('')
  registerReadingBook(
    @Body(ValidationPipe) registerReadingBookDto: RegisterReadingBookDto,
    @GetUser() user: UserEntity,
  ) {
    return this.booksService.registerReadingBook(registerReadingBookDto, user);
  }

  @Patch('/:bookId/status/done')
  updateBookStatus(@Param('bookId', ParseIntPipe) bookId: number) {
    return this.booksService.updateBookStatus(bookId);
  }
}
