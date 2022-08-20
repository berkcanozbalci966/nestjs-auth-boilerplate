import { SignInUserDto } from './dto/sign-user.dto';
import { ConfigService } from '@nestjs/config';
import { Prisma, User } from '@prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userInfo: SignInUserDto): Promise<User> {
    let user!: any;

    if (userInfo.username) {
      user = await this.usersService.getUserWithUsername(userInfo.username);
    }

    if (userInfo.email) {
      user = await this.usersService.getUserWithEmail(userInfo.email);
    }

    if (!user) {
      throw new BadRequestException('Check idendity');
    }

    const passwordIsMatched: boolean = await bcrypt.compare(
      userInfo.password,
      user.password,
    );

    if (!passwordIsMatched) {
      throw new BadRequestException('Password is not matched!');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userPayload } = user;

    return userPayload;
  }

  async login(user: any) {
    const payload = { username: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(userInfo: CreateUserDto) {
    const isUserNameUnique = await this.usersService.getUserWithUsername(
      userInfo.username,
    );

    if (isUserNameUnique) {
      throw new BadRequestException('Username exists');
    }

    const isEmailUnique = await this.usersService.getUserWithEmail(
      userInfo.email,
    );

    if (isEmailUnique) {
      throw new BadRequestException('Email is exists');
    }

    const hashedPassword: unknown = await bcrypt.hash(
      userInfo.password,
      parseInt(this.configService.get('BCRYPT_SALT_ROUND')),
    );

    const newUserPayload = {
      ...userInfo,
      password: hashedPassword,
    };

    const user = await this.usersService.createUser(
      newUserPayload as Prisma.UserCreateInput,
    );

    if (!user) {
      throw new BadRequestException('Bad payload');
    }

    return user;
  }

  getAllUser() {
    return this.usersService.getUserListWithoutParams();
  }
}
