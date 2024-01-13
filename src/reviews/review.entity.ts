import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BookEntity } from 'src/books/book.entity';
import { CommentEntity } from 'src/comments/comment.entity';
import { LikesEntity } from 'src/likes/likes.entity';
import { UserEntity } from 'src/users/user.entity';

@Entity()
export class ReviewEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @OneToOne(() => BookEntity)
  @JoinColumn({ name: 'bookId' })
  book: BookEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.review, {
    eager: true,
    cascade: true,
  })
  commentList: CommentEntity[];

  @OneToMany(() => LikesEntity, (likes: LikesEntity) => likes.review, {
    eager: true,
    cascade: true,
  })
  likeList: LikesEntity[];

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.bookList)
  user: UserEntity;
}
