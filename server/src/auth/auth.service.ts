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

  async createUser(userInfo: any) {
    const hashedPassword = await bcrypt.hash(
      userInfo.password,
      parseInt(this.configService.get('BCRYPT_SALT_ROUND')),
    );

    const userPayload = Object.assign(userInfo, { password: hashedPassword });

    return await this.usersService.createUser(userPayload);
  }

  async login(user: any) {
    console.log(user);
    return await this.getToken(user.id, user.username);
  }

  async getToken(userId, email) {
    const jwtPayload = {
      sub: userId,
      email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: jwtConstants.at_secret,
        expiresIn: '30s',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: jwtConstants.rt_secret,
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }
}
