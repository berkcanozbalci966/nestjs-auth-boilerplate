import { jwtConstants } from './../constant';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

function decodeRefreshToken(token) {
  return Buffer.from(token, 'base64').toString('ascii');
}

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: (req) => {
        const refreshToken = req?.headers?.authorization
          .replace('Bearer', '')
          .trim();

        const decodedRefreshToken = decodeRefreshToken(refreshToken);

        if (decodedRefreshToken) {
          return decodedRefreshToken;
        }
        return undefined;
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
