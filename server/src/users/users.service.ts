import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

const userSelect = {
  select: {
    username: true,
    id: true,
    password: true,
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

  async addNewRefreshToken(id, refreshToken) {
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
}
