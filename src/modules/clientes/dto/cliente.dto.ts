import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class ClienteDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @IsNumber()
    phone: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
}