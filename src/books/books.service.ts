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
    const me = await this.userRepository.findOne({
      where: { id: user.id },
    });

    const readingBookList = me.book_list.filter(
      (book) => book.status === 'READING',
    );

    return readingBookList;
  }

  async registerReadingBook(
    registerReadingBookDto: RegisterReadingBookDto,
    user: UserEntity,
  ) {
    const newReadingBook = this.bookRepository.create({
      ...registerReadingBookDto,
      user,
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
