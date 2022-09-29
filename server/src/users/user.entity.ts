import { Exclude } from 'class-transformer';

export class UserEntity {
  id: number;
  username: string;

  @Exclude()
  password: string;

  @Exclude()
  email: string;
  @Exclude()
  name: string;
  @Exclude()
  surname: string;

  @Exclude()
  role: string;

  accessToken: string;

  refreshToken: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
