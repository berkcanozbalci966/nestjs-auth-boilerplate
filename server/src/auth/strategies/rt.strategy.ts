import { jwtConstants } from './../constant';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { TokenService } from '../token.service';

function decodeRefreshToken(token) {
  return Buffer.from(token, 'base64').toString('ascii');
}

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private configService: ConfigService,
    tokenService: TokenService,
  ) {
    super({
      jwtFromRequest: (req) => {
        return tokenService.extractJwt(req);
      },
      secretOrKey: jwtConstants.rt_secret,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    const refreshToken = req?.headers?.authorization
      .replace('Bearer', '')
      .trim();
    if (!refreshToken) throw new ForbiddenException('Refresh token malformed');

    return {
      ...payload,
      refreshToken: decodeRefreshToken(refreshToken),
    };
  }
}