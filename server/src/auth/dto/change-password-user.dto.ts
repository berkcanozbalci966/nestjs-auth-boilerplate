import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordUserDto {
  @IsNotEmpty()
  @IsString()
  usernameOrEmail: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  key: string;
}
