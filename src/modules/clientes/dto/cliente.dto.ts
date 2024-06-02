import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class ClienteDTO {
    @ApiProperty({
        description: 'Nombre del usuario',
        example: 'John',
      })
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @ApiProperty({
        description: 'Apellido del usuario',
        example: 'Doe',
      })
    @IsNotEmpty()
    @IsString()
    lastname: string;
    
    @ApiProperty({
        description: 'Correo electrónico del usuario',
        example: 'usuario@example.com',
      })
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @ApiProperty({
        description: 'Numero celular del usuario',
        example: '+56 9xxxxxxxx',
      })
    @IsNotEmpty()
    @IsNumber()
    phone: number;
    
    @ApiProperty({
        description: 'Contraseña de la cuenta del usuario',
        example: 'password123',
      })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
}