import { IsEmail, IsNotEmpty, IsString, Length, Min } from 'class-validator';

export class SignInUserDto {
  @IsEmail()
  email?: string;

  @IsString()
  @Length(8, 30)
  username?: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 30)
  password: string;
}
