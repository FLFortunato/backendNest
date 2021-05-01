import { Injectable } from '@nestjs/common';
import { createUserDto } from './dtos/createUser.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private userRepo: UserRepository) {}

  async create(user: createUserDto): Promise<any> {
    return this.userRepo.createUser(user);
  }

  async findOne(email: string): Promise<any> {
    return this.userRepo.findOneUser(email);
  }

  async getAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async update(id: any, body: any): Promise<User> {
    return await this.userRepo.updateUser(id, body);
  }

  async paginated(take, skip, page): Promise<any> {
    return await this.userRepo.paginated(take, skip, page);
  }
}
