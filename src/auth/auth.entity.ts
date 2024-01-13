import { BaseEntity, Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class AuthEntity extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  userId: string;

  @Column()
  password: string;
}
