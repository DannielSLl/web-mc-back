import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ClienteUpdateDTO {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    lastname: string;

    @IsOptional()
    @IsEmail()
    email: string;
    
    @IsOptional()
    @IsNumber()
    phone: number;

    @IsOptional()
    @IsString()
    password: string;

    @IsOptional()
    @IsNumber()
    puntos: number;
}