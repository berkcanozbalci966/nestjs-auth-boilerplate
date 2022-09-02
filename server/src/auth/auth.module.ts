import { ConfigModule } from '@nestjs/config';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Passport } from 'passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';

import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    Passport,
    ConfigModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
