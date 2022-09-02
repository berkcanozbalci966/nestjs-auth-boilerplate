import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

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
      throw new BadRequestException('Bad request');
    }

    const isPasswordMatched = await bcrypt.compare(pass, user.password);

    if (!isPasswordMatched) {
      throw new BadRequestException('');
    }
    user;
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
    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
