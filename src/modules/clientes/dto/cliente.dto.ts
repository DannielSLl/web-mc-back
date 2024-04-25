import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ClienteDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;

    @IsNotEmpty()
    @IsString()
    email: string;
    
    @IsNotEmpty()
    @IsNumber()
    phone: number;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsNumber()
    puntos: number;
}