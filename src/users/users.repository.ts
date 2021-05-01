import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import { createUserDto } from './dtos/createUser.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

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
      return error;
    }
  }

  async findOneUser(email: string): Promise<User> {
    try {
      const user = await this.findOne({ where: { email } });
      return user;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async updateUser(id, body): Promise<any> {
    try {
      let password;
      if (body.password) {
        password = await bcrypt.hash(body.password, 10);
        body = { ...body, password };
      }
      const result = await this.update(id, body);

      return result;
    } catch (error) {
      throw new NotFoundException('Id not found');
    }
  }

  async paginated(take, skip, page): Promise<any> {
    try {
      const total = await this.count();
      const result = await this.find({
        take,
        skip: take * (page - 1),
        order: { name: 'DESC' },
      });
      return {
        data: result,
        totalCount: total,
        page,
        skip,
        take,
      };
    } catch (error) {}
  }
}
