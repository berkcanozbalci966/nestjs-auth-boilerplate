export interface UserSelect {
  id: number;
  username: string;
  password: string;
}

export interface UserLoginParams {
  password: string;
  usernameOrEmail: string;
}
