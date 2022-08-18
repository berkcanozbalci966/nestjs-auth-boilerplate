import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignInUserDto } from './dto/sign-user.dto';

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

  @Post('/signin')
  async signin(@Body() body: SignInUserDto) {
    return this.authService.signin(body);
  }
}
