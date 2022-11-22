import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-jwt';
import { jwtConstants } from '../constant';
import { TokenService } from '../token.service';
import { FastifyRequestTypeWithCookie } from '../../types/fastify-request-with-cookie.type';
import { COOKIE_NAMES } from '../../common/constants/cookie-names.constant';
import { HEADER_NAMES } from '../../common/constants/header-names.constant';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private tokenService: TokenService) {
    super({
      jwtFromRequest: (req: FastifyRequestTypeWithCookie) =>
        this.tokenService.detectJwtFromAndGetJWT(
          req,
          COOKIE_NAMES.ACCESS_TOKEN,
          HEADER_NAMES.ACCESS_TOKEN,
        ),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.at_secret,
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, role: payload.role };
  }
}
