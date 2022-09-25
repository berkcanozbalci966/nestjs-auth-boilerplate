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
} from '@nestjs/common';

import { Public } from '../common/decorators/public.decorator';
import { RtGuard } from '../common/guards';
import { AuthDto } from './dto/auth.dto';

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
    @Res({ passthrough: true }) response,
  ) {
    console.log(request.cookies);

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
    const refreshTokenCookie = req.cookies['__SYSTEM__'] || null;

    return this.authService.refreshAccessToken(
      req.user.sub,
      req.user.refreshToken,
    );
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
