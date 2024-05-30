import { IsEmail, IsIn, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
enum UserType {
  CLIENTE = 'cliente',
  ADMIN = 'admin',
  EMPLEADO = 'empleado',
}
export class AuthCredentialsDto {
    @ApiProperty({
      description: 'Correo electrónico del usuario',
      example: 'usuario@example.com',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
      description: 'Contraseña del usuario',
      example: 'password123',
    })
    @IsNotEmpty()
    @IsString()
    password: string;
    
    @ApiProperty({
      description: 'Tipo de usuario',
      example: 'admin',
      enum: UserType,
    })
    @IsNotEmpty()
    @IsString()
    @IsIn(['cliente', 'admin', 'empleado'])
    userType: string;
  }
  