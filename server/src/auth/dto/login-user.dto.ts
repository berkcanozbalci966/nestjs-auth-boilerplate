import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import isEmail from 'validator/lib/isEmail';

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(25)
  password: string;

  @ValidateIf((o, value) => {
    return isEmail(value);
  })
  @IsNotEmpty()
  @IsString()
  usernameOrEmail: string;
}
