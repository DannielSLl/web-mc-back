import { IsEmail, IsOptional, IsString } from "class-validator";

export class EmployeesUpdateDTO {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    lastname: string;

    @IsOptional()
    @IsString()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    role: string;
}
