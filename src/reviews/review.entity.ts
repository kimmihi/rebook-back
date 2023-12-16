import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { UserEntity } from 'src/users/user.entity';
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
  isbn: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.review_list, {
    eager: false,
  })
  user: UserEntity;

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
