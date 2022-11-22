import { UserEntity, UserInfo } from './../users/user.entity';
import { AuthService } from './auth.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
  Res,
  BadRequestException,
} from '@nestjs/common';

import { Public } from '../common/decorators/public.decorator';
import { RtGuard } from '../common/guards';
import { LoginUserDto } from './dto/login-user.dto';
import { FastifyRequestTypeWithCookie } from './../types/fastify-request-with-cookie.type';
import { CreateUserDto } from './dto/create-user.dto';
import { ForgetPasswordUserDto } from './dto/forget-password-user.dto';
import { ChangePasswordUserDto } from './dto/change-password-user.dto';
import { COOKIE_NAMES } from '../common/constants/cookie-names.constant';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/signup')
  async register(
    @Body() body: CreateUserDto,
    @Res({ passthrough: true }) response: FastifyRequestTypeWithCookie,
  ): Promise<UserEntity> {
    const { user, refreshToken, accessToken } = await this.authService.signup(
      body,
    );
    response.setCookie(COOKIE_NAMES.REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    response.setCookie(COOKIE_NAMES.ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return new UserEntity({
      accessToken,
      refreshToken,
      user: new UserInfo(user),
    });
  }

  @Public()
  @Post('/login')
  async login(
    @Body() dto: LoginUserDto,
    @Res({ passthrough: true }) response: FastifyRequestTypeWithCookie,
  ) {
    const tokens = await this.authService.login(dto);

    response.setCookie(COOKIE_NAMES.REFRESH_TOKEN, tokens.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    response.setCookie(COOKIE_NAMES.ACCESS_TOKEN, tokens.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return tokens;
  }

  @Public()
  @UseGuards(RtGuard)
  @Get('/logout')
  async logOut(@Request() req, @Res({ passthrough: true }) res) {
    await this.authService.logOut(req.user.sub);
    res.clearCookie(COOKIE_NAMES.REFRESH_TOKEN);
    res.clearCookie(COOKIE_NAMES.ACCESS_TOKEN);
    return 'yes';
  }

  @Get('/profile')
  getProfile(@Request() req) {
    return { user: req.user };
  }

  @Public()
  @Post('/refresh')
  @UseGuards(RtGuard)
  async refreshTokens(
    @Request() req,
    @Res({ passthrough: true }) response: FastifyRequestTypeWithCookie,
  ) {
    const { accessToken } = await this.authService.refreshAccessToken(
      req.user,
      req.user.refreshToken,
    );

    response.setCookie(COOKIE_NAMES.ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return accessToken;
  }

  @Public()
  @Post('/forgetpassword')
  async forgetPassword(@Body() body: ForgetPasswordUserDto) {
    try {
      await this.authService.sendUserForgetKey(body.usernameOrEmail);
      return 'yes';
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Public()
  @Post('/changepasswordwithkey')
  async changePasswordWithKey(@Body() body: ChangePasswordUserDto) {
    try {
      return await this.authService.changePasswordWithKey(
        body.usernameOrEmail,
        body.key,
        body.newPassword,
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
