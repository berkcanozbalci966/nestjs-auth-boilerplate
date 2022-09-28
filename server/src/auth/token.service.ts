import { Injectable, BadRequestException } from '@nestjs/common';
import { jwtConstants } from './constant';
import { JwtService } from '@nestjs/jwt';

import { FastifyRequestTypeWithCookie } from './../types/fastify-request-with-cookie.type';
import { JwtFrom } from '../types/jwt.type';
import { Cookie } from '../common/enums/auth.enums';
import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}
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

  extractJwtFromAuthHeader(req: any) {
    try {
      const refreshToken = req?.headers?.authorization
        .replace('Bearer', '')
        .trim();

      const decodedRefreshToken = this.decodeRefreshToken(refreshToken);

      if (decodedRefreshToken) {
        return decodedRefreshToken;
      }
    } catch (error) {
      throw new BadRequestException();
    }
  }

  extractJwtFromCookie(req: any) {
    try {
      const refreshToken = req.cookies[Cookie.REFRESH_TOKEN] || undefined;

      const decodedRefreshToken = this.decodeRefreshToken(refreshToken);

      if (decodedRefreshToken) {
        return decodedRefreshToken;
      }
      return null;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  detectJwtFrom(req: FastifyRequestTypeWithCookie): JwtFrom {
    if (req?.cookies[Cookie.REFRESH_TOKEN]) {
      return 'cookie';
    }

    if (req?.headers && req?.headers['authorization']) {
      return 'header';
    }
  }

  getJwt(jwtFrom: JwtFrom, req: FastifyRequestTypeWithCookie) {
    if (jwtFrom == 'cookie') {
      return this.extractJwtFromCookie(req);
    }

    if (jwtFrom == 'header') {
      return this.extractJwtFromAuthHeader(req);
    }
    return null;
  }

  detectJwtFromAndGetJWT(req: FastifyRequestTypeWithCookie) {
    const jwtFRom: JwtFrom = this.detectJwtFrom(req);
    const jwt = this.getJwt(jwtFRom, req);
    return jwt;
  }

  async addNewRefreshToken(id: number, refreshToken: string) {
    return await this.prisma.token.create({
      data: {
        userId: id,
        token: refreshToken,
      },
    });
  }

  async removeAllRefreshTokenWithUserId(userId: number) {
    return await this.prisma.token.deleteMany({
      where: {
        userId,
      },
    });
  }

  async findRefreshToken(refreshToken: string) {
    return await this.prisma.token.findUnique({
      where: {
        token: refreshToken,
      },
    });
  }

  async getUserTokenCount(userId: number) {
    return await this.prisma.token.count({
      where: {
        userId,
      },
    });
  }
}
