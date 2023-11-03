import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BaseEntity,
  Unique,
  OneToMany,
  ManyToMany,
} from 'typeorm';

import { Book } from 'src/reviews/dto/create-review.dto';
import { Review } from 'src/reviews/review.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  like_books: Book[];

  @ManyToMany(() => User)
  followers: User[];

  @ManyToMany(() => User)
  followings: User[];

  @OneToMany(() => Review, (review) => review.user, { eager: true })
  reviews: Review[];
}
