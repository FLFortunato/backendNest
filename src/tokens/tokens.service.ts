import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Token } from './entities/token.entity';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(Token) private tokenRepo: Repository<Token>,
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  async saveToken(token: string, email: string): Promise<any> {
    try {
      const existingToken = await this.tokenRepo.findOne({
        where: {
          email,
        },
      });

      if (existingToken) {
        return await this.tokenRepo.update(existingToken.id, { token });
      }

      const createToken = await this.tokenRepo.create({ token, email });

      return createToken.save();
    } catch (error) {}
  }

  async refreshToken({ oldToken }: any): Promise<any> {
    try {
      const existingToken = await this.tokenRepo.findOne({
        where: { token: oldToken },
      });

      if (existingToken) {
        const user = await this.userService.findOne(existingToken.email);
        if (user) {
          return await this.authService.login(user);
        }
      } else {
        throw new HttpException('Invalid Token', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async removeToken(token): Promise<any> {
    const result = await this.tokenRepo.findOne({ where: { token } });

  
    if (result) {
      return await this.tokenRepo.delete(result.id);
    }

    throw new NotFoundException('Token not found');
  }
}
