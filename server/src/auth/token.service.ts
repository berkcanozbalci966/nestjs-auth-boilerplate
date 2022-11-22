import { Injectable, BadRequestException } from '@nestjs/common';
import { jwtConstants } from './constant';
import { JwtService } from '@nestjs/jwt';

import { FastifyRequestTypeWithCookie } from './../types/fastify-request-with-cookie.type';
import { JwtFrom } from '../types/jwt.type';
import { PrismaService } from './../prisma/prisma.service';
import { COOKIE_NAMES } from '../common/constants/cookie-names.constant';
import { HEADER_NAMES } from '../common/constants/header-names.constant';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}
  getAccessToken(jwtPayload: any): Promise<string> {
    return this.jwtService.signAsync(jwtPayload, {
      secret: jwtConstants.at_secret,
      expiresIn: '5s',
    });
  }

  getRefreshToken(jwtPayload: any): Promise<string> {
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

  extractJwtFromAuthHeaderWithName(req: any, headerName: string) {
    try {
      const token = req?.headers?.[headerName].replace('Bearer', '').trim();

      const decodedToken =
        headerName == HEADER_NAMES.REFRESH_TOKEN
          ? this.decodeRefreshToken(token)
          : token;

      if (decodedToken) {
        return decodedToken;
      }
    } catch (error) {
      throw new BadRequestException();
    }
  }

  extractJwtFromCookieWithName(req: any, cookieName: string) {
    try {
      const token = req.cookies[cookieName] || undefined;

      const decodedToken =
        cookieName == COOKIE_NAMES.REFRESH_TOKEN
          ? this.decodeRefreshToken(token)
          : token;

      if (decodedToken) {
        return decodedToken;
      }
      return null;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  detectJwtFrom(
    req: FastifyRequestTypeWithCookie,
    cookieName: string,
    headerName: string,
  ): JwtFrom {
    if (req?.cookies[cookieName]) {
      return 'cookie';
    }

    if (req?.headers && req?.headers[headerName]) {
      return 'header';
    }
  }

  getJwt(
    jwtFrom: JwtFrom,
    req: FastifyRequestTypeWithCookie,
    cookieName: string,
    headerName: string,
  ) {
    if (jwtFrom == 'cookie') {
      return this.extractJwtFromCookieWithName(req, cookieName);
    }

    if (jwtFrom == 'header') {
      return this.extractJwtFromAuthHeaderWithName(req, headerName);
    }
    return null;
  }

  detectJwtFromAndGetJWT(
    req: FastifyRequestTypeWithCookie,
    cookieName: string,
    headerName: string,
  ) {
    const jwtFRom: JwtFrom = this.detectJwtFrom(req, cookieName, headerName);
    const jwt = this.getJwt(jwtFRom, req, cookieName, headerName);
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
    if (refreshToken) {
      return await this.prisma.token.findUnique({
        where: {
          token: refreshToken,
        },
      });
    }
    return;
  }

  async getUserTokenCount(userId: number) {
    return await this.prisma.token.count({
      where: {
        userId,
      },
    });
  }

  async jwtPayloadGenerator(userId: number, role: string) {
    return {
      sub: userId,
      role,
    };
  }
}
