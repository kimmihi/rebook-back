import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { CommentEntity } from 'src/comments/comment.entity';
import { LikesEntity } from 'src/likes/likes.entity';
import { BookEntity } from 'src/books/book.entity';

@Entity()
export class ReviewEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  user_id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => BookEntity, (book: BookEntity) => book.review_list, {
    eager: true,
  })
  book: BookEntity;

  @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.review, {
    eager: true,
    cascade: true,
  })
  comment_list: CommentEntity[];

  @OneToMany(() => LikesEntity, (likes: LikesEntity) => likes.review, {
    eager: true,
    cascade: true,
  })
  like_list: LikesEntity[];
}
