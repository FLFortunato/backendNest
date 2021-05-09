import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokensService } from 'src/tokens/tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    @Inject(forwardRef(() => TokensService))
    private tokenService: TokensService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    const pass = await bcrypt.compare(password, user.password);

    if (user && pass) {
      const { passowrd, ...result } = user;

      return result;
    }

    return null;
  }

  async login(user: any): Promise<any> {
    const payload = { email: user.email, sub: user.id };

    const token = this.jwtService.sign(payload);

    await this.tokenService.saveToken(token, user.email);
    return {
      access_token: token,
    };
  }
}
