import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './../users/users.service';
import * as bcrypt from 'bcrypt';
import isEmail from 'validator/lib/isEmail';
import { ConfigService } from '@nestjs/config';

import { LoginTokens } from './types/token.type';
import { UserLoginParams, UserSelect } from './types/user.type';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    private tokenService: TokenService,
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

    const { refreshToken, accessToken } = await this.getToken(user.id);

    const userTokenCount = await this.usersService.getUserTokenCount(user.id);

    if (userTokenCount > 1) {
      await this.usersService.removeAllRefreshTokenWithUserId(user.id);
    }

    await this.usersService.addNewRefreshToken(user.id, refreshToken);

    return {
      refreshToken: this.tokenService.encodeToken(refreshToken),
      accessToken,
    };
  }

  async logOut(userId: number) {
    if (userId) {
      await this.usersService.removeAllRefreshTokenWithUserId(userId);
      return;
    }
    throw new BadRequestException();
  }

  async refreshAccessToken(userId: number, refreshToken: string) {
    const refreshTokenIsFounded = await this.usersService.findRefreshToken(
      refreshToken,
    );

    if (!refreshTokenIsFounded) {
      throw new BadRequestException();
    }

    return await this.tokenService.getAccessToken(userId);
  }

  async getToken(userId: number): Promise<LoginTokens> {
    const [at, rt] = await Promise.all([
      this.tokenService.getAccessToken(userId),
      this.tokenService.getRefreshToken(userId),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }
}
