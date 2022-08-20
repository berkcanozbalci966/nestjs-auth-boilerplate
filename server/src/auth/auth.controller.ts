import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SignInUserDto } from './dto/sign-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  getUserList() {
    return this.authService.getAllUser();
  }

  @Post('/signup')
  async signup(@Body() body: CreateUserDto) {
    return this.authService.signup(body as Prisma.UserCreateInput);
  }

  @UseGuards(AuthGuard('local'))
  @Post('/signin')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }
}
