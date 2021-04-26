import { Body, Controller, Post } from '@nestjs/common';
import { createUserDto } from './dtos/createUser.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  async create(@Body() body: createUserDto): Promise<User> {
    return this.service.create(body);
  }
}
