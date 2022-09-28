import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './../users/users.service';
import * as bcrypt from 'bcrypt';

import { ConfigService } from '@nestjs/config';

import { LoginTokens } from './types/token.type';
import { UserLoginParams } from './types/user.type';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    private tokenService: TokenService,
  ) {}

  async createUser(userInfo: any) {
    const hashedPassword = await this.hashPassword(userInfo.password);
    const userPayload = Object.assign(userInfo, { password: hashedPassword });

    return await this.usersService.createUser(userPayload);
  }

  async validateUser(userLoginParams: UserLoginParams): Promise<any> {
    const user = await this.usersService.findUser(
      userLoginParams.usernameOrEmail,
    );

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

  async changePassword(userId: number, password: string) {
    const hashedPassword = await this.hashPassword(password);
    await this.usersService.updateUser({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
      },
    });
  }

  async logOut(userId: number) {
    if (userId) {
      await this.usersService.removeAllRefreshTokenWithUserId(userId);
      return;
    }
    throw new BadRequestException();
  }

  async sendUserForgetKey(usernameOrEmail: string) {
    const user = await this.usersService.findUser(usernameOrEmail);
    const userForgetKeyCount = await this.usersService.userForgetKeyCount(
      user.id,
    );
    if (userForgetKeyCount) {
      await this.usersService.removeUserForgetKey(user.id);
    }

    return await this.usersService.createUserForgetKey(user.id);
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

  async hashPassword(password: string) {
    return await bcrypt.hash(
      password,
      parseInt(this.configService.get('BCRYPT_SALT_ROUND')),
    );
  }

  async changePasswordWithKey(
    usernameOrEmail: string,
    key: string,
    newPassword: string,
  ) {
    const user = await this.usersService.findUser(usernameOrEmail);
    if (user.passwordForgetKey.key == key) {
      await this.changePassword(user.id, newPassword);
      await this.usersService.removeAllRefreshTokenWithUserId(user.id);
      return 'password changed!';
    }
    return undefined;
  }
}
