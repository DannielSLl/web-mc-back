import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
export class AuthCredentialsDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
  }
  