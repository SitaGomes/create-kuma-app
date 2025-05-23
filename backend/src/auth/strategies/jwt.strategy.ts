import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { getConfigToken } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ENV } from 'src/data/constants/ENV';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: getConfigToken(ENV.JWT_SECRET),
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateUser(payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
