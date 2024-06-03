import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class AdminDTO {
    @ApiProperty({
        description: 'Nombre del usuairo administrador',
        example: 'John',
      })
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @ApiProperty({
        description: 'Apellido del usuario administrador',
        example: 'Doe',
      })
    @IsNotEmpty()
    @IsString()
    lastname: string;
    
    @ApiProperty({
        description: 'Email del administrador',
        example: 'admin@example.com',
      })
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @ApiProperty({
        description: 'Contraseña del administrador',
        example: 'admin123',
      })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
}