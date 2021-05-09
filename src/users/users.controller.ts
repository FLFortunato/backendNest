import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  Request,
  Param,
  Query,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/strategies/guards/jwt.guard';
import { EmailService } from 'src/emailConfirmation/email.service';
import { createUserDto } from './dtos/createUser.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly service: UsersService,
    private emailService: EmailService,
  ) {}

  @Post()
  async create(@Body() body: createUserDto): Promise<User> {
    return this.service.create(body);
  }

  @Get('/confirmation')
  async confirmation(@Query() { token }): Promise<any> {
    return await this.service.confirmation(token);
  }

  @Get()
  async getAll(): Promise<User[]> {
    return await this.service.getAll();
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  async update(@Body() body, @Param() param): Promise<User> {
    return this.service.update(param.id, body);
  }

  @UseGuards(JwtGuard)
  @Get('paged')
  async paged(@Query() { take, skip, page }): Promise<any> {
    return await this.service.paginated(take, skip, page);
  }
}
