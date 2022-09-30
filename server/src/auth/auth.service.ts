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

  async signup(userInfo: any) {
    const user = await this.createUser(userInfo);
    const { refreshToken, accessToken } = await this.getToken(user.id);
    await this.tokenService.addNewRefreshToken(user.id, refreshToken);

    return {
      user,
      refreshToken: this.tokenService.encodeToken(refreshToken),
      accessToken,
    };
  }

  async validateUser(userLoginParams: UserLoginParams): Promise<any> {
    const user = await this.usersService.findUser(
      userLoginParams.usernameOrEmail,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordMatched = await this.comparePassword(
      userLoginParams.password,
      user.password,
    );

    if (!isPasswordMatched) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async login(userLoginParams: UserLoginParams) {
    const user = await this.validateUser(userLoginParams);

    const { refreshToken, accessToken } = await this.getToken(user.id);

    const userTokenCount = user.tokens.length;

    if (userTokenCount >= 1) {
      await this.tokenService.removeAllRefreshTokenWithUserId(user.id);
    }

    await this.tokenService.addNewRefreshToken(user.id, refreshToken);

    return {
      refreshToken: this.tokenService.encodeToken(refreshToken),
      accessToken,
      user: {
        id: user.id,
      },
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
      await this.tokenService.removeAllRefreshTokenWithUserId(userId);
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
    const refreshTokenIsFounded = await this.tokenService.findRefreshToken(
      refreshToken,
    );

    if (!refreshTokenIsFounded) {
      throw new BadRequestException();
    }

    const accessToken = await this.tokenService.getAccessToken(userId);

    return { accessToken };
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

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async changePasswordWithKey(
    usernameOrEmail: string,
    key: string,
    newPassword: string,
  ) {
    const user = await this.usersService.findUser(usernameOrEmail);
    if (user.passwordForgetKey.key == key) {
      await this.changePassword(user.id, newPassword);
      await this.tokenService.removeAllRefreshTokenWithUserId(user.id);
      return 'password changed!';
    }
    return undefined;
  }
}
