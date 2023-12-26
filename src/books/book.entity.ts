import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export type BookStatus = 'READING' | 'DONE';

@Entity()
export class BookEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

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
}
