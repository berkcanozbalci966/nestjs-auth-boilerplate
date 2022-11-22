import { jwtConstants } from './../constant';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ForbiddenException, Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { TokenService } from '../token.service';
import { FastifyRequestTypeWithCookie } from './../../types/fastify-request-with-cookie.type';
import { COOKIE_NAMES } from '../../common/constants/cookie-names.constant';
import { HEADER_NAMES } from '../../common/constants/header-names.constant';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private configService: ConfigService,
    private tokenService: TokenService,
  ) {
    super({
      jwtFromRequest: (req: FastifyRequestTypeWithCookie) => {
        return this.tokenService.detectJwtFromAndGetJWT(
          req,
          COOKIE_NAMES.REFRESH_TOKEN,
          HEADER_NAMES.REFRESH_TOKEN,
        );
      },
      secretOrKey: jwtConstants.rt_secret,
      passReqToCallback: true,
    });
  }

  validate(req: FastifyRequestTypeWithCookie, payload: any) {
    const refreshToken = this.tokenService.detectJwtFromAndGetJWT(
      req,
      COOKIE_NAMES.REFRESH_TOKEN,
      HEADER_NAMES.REFRESH_TOKEN,
    );

    if (!refreshToken) throw new ForbiddenException('Refresh token malformed');

    return {
      ...payload,
      refreshToken,
    };
  }
}
