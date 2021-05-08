import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/emailConfirmation/email.service';
import { createUserDto } from './dtos/createUser.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private userRepo: UserRepository,
    private emailService: EmailService,
    private jwtService: JwtService,
  ) {}

  async create(user: createUserDto): Promise<any> {
    const payload = { email: user.email, sub: user.id };

    const token = await this.jwtService.sign(payload);
    const created = await this.userRepo.createUser(user);

    if (created.email) {
      await this.emailService.nodemailer(
        {
          email: created.email,
          id: created.id,
        },
        token,
      );
    }
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

  async confirmation(token: string): Promise<any> {
    const { email }: any = await this.jwtService.decode(token);
    return await this.userRepo.updateActive(email);
  }
}
