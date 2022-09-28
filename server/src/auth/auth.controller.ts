import { UserEntity } from './../users/user.entity';
import { AuthService } from './auth.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
  UseInterceptors,
  Res,
  BadRequestException,
} from '@nestjs/common';

import { Public } from '../common/decorators/public.decorator';
import { RtGuard } from '../common/guards';
import { AuthDto } from './dto/auth.dto';
import { FastifyRequestTypeWithCookie } from './../types/fastify-request-with-cookie.type';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/signup')
  async register(@Body() body: any): Promise<UserEntity> {
    return new UserEntity(await this.authService.createUser(body));
  }

  @Public()
  @Post('/login')
  async login(
    @Body() dto: AuthDto,
    @Req() request,
    @Res({ passthrough: true }) response: FastifyRequestTypeWithCookie,
  ) {
    const tokens = await this.authService.login(dto);

    response.setCookie('__SYSTEM__', tokens.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return tokens;
  }

  @Public()
  @Post('/refresh')
  @UseGuards(RtGuard)
  refreshTokens(@Request() req) {
    return this.authService.refreshAccessToken(
      req.user.sub,
      req.user.refreshToken,
    );
  }

  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }
  @Public()
  @UseGuards(RtGuard)
  @Get('/logout')
  async logOut(@Request() req, @Res({ passthrough: true }) res) {
    await this.authService.logOut(req.user.sub);
    res.clearCookie('__SYSTEM__');
    return 'yes';
  }

  @Public()
  @Post('/forgetpassword')
  async forgetPassword(@Body() body) {
    try {
      await this.authService.sendUserForgetKey(body.usernameOrEmail);
      return 'yes';
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Public()
  @Post('/changepasswordwithkey')
  async changePasswordWithKey(@Body() body) {
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
