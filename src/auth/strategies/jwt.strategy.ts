import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { secret } from './secret';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true, // Ignore it so we can make our own validationyy
      secretOrKey: secret,
      passReqToCallback: true,
    });
  }

  async validate(req, payload: any) {
    const user = await this.userService.findOne(payload.email);
 
    if (!user) {
      throw new UnauthorizedException();
    }
    if (req.header.authorization != (await user).token) {
      throw new UnauthorizedException();
    }

    return { userId: payload.sub, email: payload.email };
  }
}
