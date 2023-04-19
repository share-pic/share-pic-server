import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;
}
