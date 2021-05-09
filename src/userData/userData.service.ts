import { Injectable } from '@nestjs/common';
import { CreateUserDataDto } from './dto/createUserData.dto';
import { UserDataRepository } from './userData.repository';

@Injectable()
export class UserDataService {
  constructor(private userDataRepo: UserDataRepository) {}

  async create(data: CreateUserDataDto) {
    return await this.userDataRepo.createUserData(data);
  }
}
