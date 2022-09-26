import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constant';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}
  getAccessToken(userId: number): Promise<string> {
    const jwtPayload = {
      sub: userId,
    };

    return this.jwtService.signAsync(jwtPayload, {
      secret: jwtConstants.at_secret,
      expiresIn: '1m',
    });
  }

  getRefreshToken(userId: number): Promise<string> {
    const jwtPayload = {
      sub: userId,
    };

    return this.jwtService.signAsync(jwtPayload, {
      secret: jwtConstants.rt_secret,
      expiresIn: '7d',
    });
  }

  encodeToken(token: string) {
    const buf = Buffer.from(token).toString('base64');
    return buf;
  }

  decodeRefreshToken(token: string) {
    return Buffer.from(token, 'base64').toString('ascii');
  }

  extractJwt(req: any) {
    const refreshToken = req?.headers?.authorization
      .replace('Bearer', '')
      .trim();

    const decodedRefreshToken = this.decodeRefreshToken(refreshToken);

    if (decodedRefreshToken) {
      return decodedRefreshToken;
    }
    return undefined;
  }

  extractJwtFromCookie(req: any) {
    const refreshToken = req.cookies['__SYSTEM__'] || undefined;

    const decodedRefreshToken = this.decodeRefreshToken(refreshToken);

    if (decodedRefreshToken) {
      return decodedRefreshToken;
    }

    return undefined;
  }
}
