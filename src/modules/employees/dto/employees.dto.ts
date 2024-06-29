import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmployeesDTO {
  @ApiProperty({ 
    description: 'Nombre del empleado', 
    example: 'Juan' 
  })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString()
  name: string;

  @ApiProperty({ 
    description: 'Apellido del empleado', 
    example: 'Pérez' 
  })
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @IsString()
  lastname: string;

  @ApiProperty({ 
    description: 'Correo electrónico del empleado', 
    example: 'juan.perez@example.com' 
  })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  @IsString()
  @IsEmail({}, { message: 'El correo electrónico debe tener un formato válido' })
  email: string;

  @ApiProperty({ 
    description: 'Contraseña del empleado', 
    example: 'ContraseñaSegura123' 
  })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @IsString()
  password: string;

  @ApiProperty({ 
    description: 'Rol del empleado en la empresa', 
    example: 'admin' 
  })
  @IsNotEmpty({ message: 'El rol es obligatorio' })
  @IsString()
  role: string;
}
