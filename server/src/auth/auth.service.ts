import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constant';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async createUser(userInfo: any) {
    const hashedPassword = await bcrypt.hash(
      userInfo.password,
      parseInt(this.configService.get('BCRYPT_SALT_ROUND')),
    );

    const userPayload = Object.assign(userInfo, { password: hashedPassword });

    return await this.usersService.createUser(userPayload);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserWithUsername(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordMatched = await bcrypt.compare(pass, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async login(user: any) {
    console.log(user);
    return await this.getToken(user.id);
  }

  async getToken(userId) {
    const [at, rt] = await Promise.all([
      this.getAccessToken(userId),
      this.getRefreshToken(userId),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  getAccessToken(userId) {
    const jwtPayload = {
      sub: userId,
    };

    return this.jwtService.signAsync(jwtPayload, {
      secret: jwtConstants.at_secret,
      expiresIn: '30s',
    });
  }

  getRefreshToken(userId) {
    const jwtPayload = {
      sub: userId,
    };

    return this.jwtService.signAsync(jwtPayload, {
      secret: jwtConstants.rt_secret,
      expiresIn: '7d',
    });
  }
}
