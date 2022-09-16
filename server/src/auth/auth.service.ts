import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import * as bcrypt from 'bcrypt';
import isEmail from 'validator/lib/isEmail';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { LoginTokens } from './types/token.type';
import { AuthDto } from './dto/auth.dto';
import { UserSelect } from './types/user.type';

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

  async validateUser(authDto: AuthDto): Promise<any> {
    let user: UserSelect;

    if (isEmail(authDto.usernameOrEmail)) {
      user = await this.usersService.getUserWithEmail(authDto.usernameOrEmail);
    } else {
      user = await this.usersService.getUserWithUsername(
        authDto.usernameOrEmail,
      );
    }

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordMatched = bcrypt.compare(authDto.password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async login(authDto: AuthDto) {
    const user = await this.validateUser(authDto);

    return await this.getToken(user.id);
  }

  async getToken(userId): Promise<LoginTokens> {
    const [at, rt] = await Promise.all([
      this.getAccessToken(userId),
      this.getRefreshToken(userId),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  getAccessToken(userId): Promise<string> {
    const jwtPayload = {
      sub: userId,
    };

    return this.jwtService.signAsync(jwtPayload, {
      secret: jwtConstants.at_secret,
      expiresIn: '30s',
    });
  }

  getRefreshToken(userId): Promise<string> {
    const jwtPayload = {
      sub: userId,
    };

    return this.jwtService.signAsync(jwtPayload, {
      secret: jwtConstants.rt_secret,
      expiresIn: '7d',
    });
  }
}
