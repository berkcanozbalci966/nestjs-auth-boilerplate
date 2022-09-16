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
  async login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  refreshTokens(@Request() req: any) {
    return this.authService.getAccessToken(req.user.sub);
  }

  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
