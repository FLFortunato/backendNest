import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {UsersService} from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';
import {TokensService} from 'src/tokens/tokens.service';
import moment from 'moment';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    @Inject(forwardRef(() => TokensService))
    private tokenService: TokensService
  ) {}

  async validateUser({email, password}): Promise<any> {
    const user = await this.userService.findOne(email);
    const pass = await bcrypt.compare(password, user.password);

    if (user && pass) {
      const {passowrd, ...result} = user;

      return result;
    }

    return null;
  }

  async login(user: any): Promise<any> {
    const payload = {
      email: user.email,
      sub: user.id,
    };

    const token = this.jwtService.sign(payload);

    await this.tokenService.saveToken(token, user.email);

    const userData = await this.userService.findOne(user.email);

    return {
      access_token: token,
      info: user.id,
      userData: {name: userData.name, email: userData.email},
    };
  }

  async logout(actualToken: string): Promise<void> {
    try {
      return await this.tokenService.removeToken(actualToken);
    } catch (error) {
      return error;
    }
  }
}
