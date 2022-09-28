import { jwtConstants } from './../constant';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ForbiddenException, Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { TokenService } from '../token.service';
import { FastifyRequestTypeWithCookie } from './../../types/fastify-request-with-cookie.type';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private configService: ConfigService,
    private tokenService: TokenService,
  ) {
    super({
      jwtFromRequest: (req: FastifyRequestTypeWithCookie) => {
        return this.tokenService.detectJwtFromAndGetJWT(req);
      },
      secretOrKey: jwtConstants.rt_secret,
      passReqToCallback: true,
    });
  }

  validate(req: FastifyRequestTypeWithCookie, payload: any) {
    const refreshToken = this.tokenService.detectJwtFromAndGetJWT(req);

    if (!refreshToken) throw new ForbiddenException('Refresh token malformed');

    return {
      ...payload,
      refreshToken,
    };
  }
}
