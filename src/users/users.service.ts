import { Injectable } from '@nestjs/common';
import { createUserDto } from './dtos/createUser.dto';
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
}
