import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BaseEntity,
  Unique,
  OneToMany,
} from 'typeorm';

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

  @OneToMany(() => Review, (review) => review.user, { eager: true })
  reviews: Review[];
}
