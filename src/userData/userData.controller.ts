import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDataDto } from './dto/createUserData.dto';
import { UserData } from './entities/userData.entity';
import { UserDataService } from './userData.service';

@Controller('userdata')
export class UserDataController {
  constructor(private service: UserDataService) {}

  @Post()
  async create(@Body() body: CreateUserDataDto): Promise<UserData> {
    return await this.service.create(body);
  }
}
