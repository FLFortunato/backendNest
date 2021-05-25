import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserData extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne((type) => User, (user) => user.userData)
  user: User;

  @Column()
  @IsNotEmpty()
  @IsString()
  street: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  number: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  neighborhood: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  city: string;

  @Column()
  @IsOptional()
  complement: string;

  @Column()
  @IsNotEmpty()
  zipcode: string;

  @Column()
  @IsNotEmpty()
  state: string;

  @Column()
  @IsNotEmpty()
  country: string;

  @Column()
  phone: string;

  @Column()
  cellphone: string;
}
