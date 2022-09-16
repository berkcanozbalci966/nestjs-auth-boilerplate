import { UserEntity } from './../users/user.entity';
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
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { Public } from './decorators/public.decorator';
import { RtGuard, AtGuard } from '../common/guards';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/signup')
  async register(@Body() body: any): Promise<UserEntity> {
    return new UserEntity(await this.authService.createUser(body));
  }

  @UseGuards(AuthGuard('local'))
  @Public()
  @Post('/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  refreshTokens(@Request() req: any) {
    console.log(req.user);

    return this.authService.getAccessToken(req.user.sub);
  }

  @UseGuards(AtGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
