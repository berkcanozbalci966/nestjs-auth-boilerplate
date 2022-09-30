import { Exclude } from 'class-transformer';

export class UserInfo {
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
  created_at: Date;

  @Exclude()
  role: string;
  constructor(partial: Partial<UserInfo>) {
    Object.assign(this, partial);
  }
}

export class UserEntity {
  user: UserInfo;

  accessToken: string;

  refreshToken: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
