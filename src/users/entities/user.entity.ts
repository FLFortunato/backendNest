import { IsEmail, IsEmpty, IsOptional } from 'class-validator';
import { Post } from '../../posts/entities/post.entity';
import { UserData } from '../../userData/entities/userData.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isActive: boolean;

  @OneToMany((type) => Post, (post) => post.user)
  posts: Post[];

  @Column({ nullable: true })
  @IsOptional()
  token: string;

  @OneToOne(() => UserData, (userdata) => userdata.user)
  @JoinColumn()
  userData: UserData;
}
