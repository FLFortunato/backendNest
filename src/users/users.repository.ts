import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import { createUserDto } from './dtos/createUser.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(data: createUserDto): Promise<any> {
    try {
      const password = await bcrypt.hash(data.password, 10);

      const user = await this.insert({ ...data, password });

      return user;
    } catch (error) {
      if (error.code === '23505') {
        throw new UnauthorizedException('Email is being used already');
      }
      return;
    }
  }

  async findOneUser(email: string): Promise<User> {
    try {
      const user = await this.findOne({ where: { email } });
      return user;
    } catch (error) {
      console.log('---->', error);
    }
  }
}
