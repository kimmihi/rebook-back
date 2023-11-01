import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Book } from './dto/create-review.dto';
import { User } from 'src/auth/user.entity';

@Entity()
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  book: Book;

  @ManyToOne(() => User, (user) => user.reviews, { eager: false })
  user: User;
}
