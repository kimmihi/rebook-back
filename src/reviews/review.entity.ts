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

  @Column()
  book_id: number;

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
  comment_list: CommentEntity[];

  @OneToMany(() => LikesEntity, (likes: LikesEntity) => likes.review, {
    eager: true,
    cascade: true,
  })
  like_list: LikesEntity[];
}
