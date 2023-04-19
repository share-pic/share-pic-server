import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;
}
