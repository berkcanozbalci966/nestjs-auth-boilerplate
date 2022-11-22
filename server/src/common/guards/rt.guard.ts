import {
  Injectable,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenService } from './../../auth/token.service';
import { COOKIE_NAMES } from '../constants/cookie-names.constant';
import { HEADER_NAMES } from '../constants/header-names.constant';

@Injectable()
export class RtGuard extends AuthGuard('jwt-refresh') {
  constructor(private tokenService: TokenService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const jwt = this.tokenService.detectJwtFromAndGetJWT(
      request,
      COOKIE_NAMES.REFRESH_TOKEN,
      HEADER_NAMES.REFRESH_TOKEN,
    );
    const isTokenFounded = this.tokenService.findRefreshToken(jwt);

    if (!jwt && !isTokenFounded) {
      throw new BadRequestException();
    }

    return super.canActivate(context);
  }
}
