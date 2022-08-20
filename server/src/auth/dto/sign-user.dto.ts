import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class SignInUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @Length(6, 30)
  username?: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 30)
  @Exclude()
  password: string;
}
