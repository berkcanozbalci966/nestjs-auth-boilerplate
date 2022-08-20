import { SignInUserDto } from './dto/sign-user.dto';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    console.log({ username, password });
    const user = await this.authService.validateUser({
      username,
      password,
    } as SignInUserDto);
    if (!user) {
      throw new UnauthorizedException();
    }

    const jwtPayload = this.authService.login(user);

    return jwtPayload;
  }
}
