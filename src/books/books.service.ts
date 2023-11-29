import { Injectable } from '@nestjs/common';
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

  async registerReadingBook(
    registerReadingBookDto: RegisterReadingBookDto,
    user: UserEntity,
  ) {
    const { title, author, isbn, cover } = registerReadingBookDto;

    const newReadingBook = this.bookRepository.create({
      title,
      author,
      isbn,
      cover,
      user,
    });

    await this.bookRepository.save(newReadingBook);
    return newReadingBook;
  }
}
