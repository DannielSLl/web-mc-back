import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class EmployeesDTO {
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @IsString()
    name: string;

    @IsNotEmpty({ message: 'El apellido es obligatorio' })
    @IsString()
    lastname: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail({}, { message: 'El correo electrónico debe tener un formato válido' })
    email: string;

    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    @IsString()
    password: string;

    @IsNotEmpty({ message: 'El rol es obligatorio' })
    @IsString()
    role: string;
}
