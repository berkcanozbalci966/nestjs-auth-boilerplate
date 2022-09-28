import {
  Injectable,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenService } from './../../auth/token.service';

@Injectable()
export class RtGuard extends AuthGuard('jwt-refresh') {
  constructor(private tokenService: TokenService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const jwt = this.tokenService.detectJwtFromAndGetJWT(request);
    const isTokenFounded = this.tokenService.findRefreshToken(jwt);

    if (!jwt && !isTokenFounded) {
      throw new BadRequestException();
    }

    console.log(jwt);
    return super.canActivate(context);
  }
}
