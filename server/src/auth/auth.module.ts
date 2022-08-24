import { ConfigModule } from '@nestjs/config';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Passport } from 'passport';
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModule, Passport, ConfigModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
