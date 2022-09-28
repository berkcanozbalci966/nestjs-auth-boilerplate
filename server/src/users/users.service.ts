import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import isEmail from 'validator/lib/isEmail';

const userSelect = {
  select: {
    username: true,
    id: true,
    password: true,
    passwordForgetKey: true,
  },
};

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async findUser(usernameOrEmail: string) {
    try {
      if (isEmail(usernameOrEmail)) {
        return await this.getUserWithEmail(usernameOrEmail);
      }
      return await this.getUserWithUsername(usernameOrEmail);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async getUserWithUsername(username: string) {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
      ...userSelect,
    });
  }

  async getUserWithEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
      ...userSelect,
    });
  }

  async getUserList(params: Prisma.UserFindManyArgs): Promise<User[] | null> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async getUserListWithoutParams(): Promise<User[] | null[]> {
    return this.prisma.user.findMany();
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user
      .create({
        data,
      })
      .catch(() => {
        throw new BadRequestException('Email or username exists!');
      });
  }

  async updateUser(params: Prisma.UserUpdateArgs): Promise<User> {
    const { where, data } = params;

    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({ where });
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
    return await this.prisma.token.findUnique({
      where: {
        token: refreshToken,
      },
    });
  }

  async getUserTokenCount(userId: number) {
    return await this.prisma.token.count({
      where: {
        userId,
      },
    });
  }

  async createUserForgetKey(userId: number) {
    const forgetKey = Math.floor(Math.random() * (9999 - 1000) + 1000);

    return await this.prisma.passwordForgetKey.create({
      data: {
        userId: userId,
        key: String(forgetKey),
      },
    });
  }

  async removeUserForgetKey(userId: number) {
    return await this.prisma.passwordForgetKey.delete({
      where: {
        userId: userId,
      },
    });
  }

  async userForgetKeyCount(userId: number) {
    return await this.prisma.passwordForgetKey.count({
      where: {
        userId,
      },
    });
  }
}
