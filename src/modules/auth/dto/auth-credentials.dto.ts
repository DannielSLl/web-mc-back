import { IsEmail, IsIn, IsNotEmpty, IsString } from "class-validator";
export class AuthCredentialsDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
    
    @IsNotEmpty()
    @IsString()
    @IsIn(['cliente', 'admin', 'empleado'])
    userType: string;
  }
  