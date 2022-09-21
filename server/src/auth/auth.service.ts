import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import * as bcrypt from 'bcrypt';
import isEmail from 'validator/lib/isEmail';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { LoginTokens } from './types/token.type';
import { UserLoginParams, UserSelect } from './types/user.type';

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

  async validateUser(userLoginParams: UserLoginParams): Promise<any> {
    let user: UserSelect;

    if (isEmail(userLoginParams.usernameOrEmail)) {
      user = await this.usersService.getUserWithEmail(
        userLoginParams.usernameOrEmail,
      );
    } else {
      user = await this.usersService.getUserWithUsername(
        userLoginParams.usernameOrEmail,
      );
    }

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordMatched = (await bcrypt.compare(
      userLoginParams.password,
      user.password,
    )) as unknown as boolean;

    if (!isPasswordMatched) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async login(userLoginParams: UserLoginParams) {
    const user = await this.validateUser(userLoginParams);

    const { refreshToken } = await this.getToken(user.id);

    const userTokenCount = await this.usersService.getUserTokenCount(user.id);

    if (userTokenCount > 0) {
      await this.usersService.removeAllRefreshTokenWithUserId(user.id);
    }

    await this.usersService.addNewRefreshToken(user.id, refreshToken);

    return await this.getToken(user.id);
  }

  async getToken(userId: number): Promise<LoginTokens> {
    const [at, rt] = await Promise.all([
      this.getAccessToken(userId),
      this.getRefreshToken(userId),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  getAccessToken(userId: number): Promise<string> {
    const jwtPayload = {
      sub: userId,
    };

    return this.jwtService.signAsync(jwtPayload, {
      secret: jwtConstants.at_secret,
      expiresIn: '30s',
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
}
