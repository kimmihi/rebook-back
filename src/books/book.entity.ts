import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from 'src/users/user.entity';

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
  sale_price: string;

  @Column()
  publisher: string;

  @Column()
  thumbnail: string;

  @Column()
  datetime: Date;

  @Column({ default: 'READING' })
  status: BookStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.book_list, {
    eager: false,
  })
  user: UserEntity;
}
