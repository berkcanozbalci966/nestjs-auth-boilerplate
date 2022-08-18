import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  getAllUser() {
    return this.usersService.getUserListWithoutParams();
  }
}
