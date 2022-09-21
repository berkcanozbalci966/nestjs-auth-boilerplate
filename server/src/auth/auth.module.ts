import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Passport } from 'passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';

import { AtStrategy } from './strategies/at.strategy';
import { RtStrategy } from './strategies/rt.strategy';
import { TokenService } from './token.service';

@Module({
  imports: [
    UsersModule,
    Passport,
    ConfigModule,
    JwtModule.register({
      secret: jwtConstants.at_secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, AtStrategy, RtStrategy, TokenService],
  controllers: [AuthController],
})
export class AuthModule {}
