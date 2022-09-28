import { IsNotEmpty, IsString } from 'class-validator';

export class ForgetPasswordUserDto {
  @IsNotEmpty()
  @IsString()
  usernameOrEmail: string;
}
