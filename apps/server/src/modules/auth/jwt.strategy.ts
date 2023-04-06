import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { parse } from 'cookie';
import { JwtCookieToken } from '@libs/constants/auth';
import { JwtPayload } from '@server/modules/auth/interfaces';
import { AuthService } from '@server/modules/auth/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          const cookie = parse(req.headers.cookie ?? '');
          return req && cookie?.[JwtCookieToken];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: JwtPayload) {
    return this.authService.getLoggedUser(payload.id);
  }
}
