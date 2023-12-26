import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';
import { UserEntity } from 'src/users/user.entity';
import { RegisterReadingBookDto } from './dto/register-reading-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getReadingBookList(user: UserEntity) {
    const readingBookList = await this.bookRepository.find({
      where: { user_id: user.id, status: 'READING' },
    });

    return readingBookList;
  }

  async getBookItem(bookId: number, user: UserEntity) {
    const book = await this.bookRepository.findOne({
      where: { id: bookId, user_id: user.id },
    });

    return book;
  }

  async registerReadingBook(
    registerReadingBookDto: RegisterReadingBookDto,
    user: UserEntity,
  ) {
    const newReadingBook = this.bookRepository.create({
      ...registerReadingBookDto,
      user_id: user.id,
    });

    await this.bookRepository.save(newReadingBook);
    return newReadingBook;
  }

  async updateBookStatus(bookId: number) {
    await this.bookRepository.update(bookId, {
      status: 'DONE',
    });
    return HttpStatus.OK;
  }
}
