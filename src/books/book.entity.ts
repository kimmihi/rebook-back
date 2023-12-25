import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserEntity } from 'src/users/user.entity';
import { ReviewEntity } from 'src/reviews/review.entity';

export type BookStatus = 'READING' | 'DONE';

@Entity()
export class BookEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  contents: string;

  @Column()
  author: string;

  @Column()
  translator: string;

  @Column()
  isbn: string;

  @Column()
  price: number;

  @Column()
  sale_price: number;

  @Column()
  publisher: string;

  @Column()
  thumbnail: string;

  @Column()
  datetime: string;

  @Column({ default: 'READING' })
  status: BookStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => ReviewEntity, (review: ReviewEntity) => review.book, {
    eager: false,
  })
  review_list: ReviewEntity[];

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.book_list, {
    eager: false,
  })
  user: UserEntity;
}
