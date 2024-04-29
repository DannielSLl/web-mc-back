import { IsNotEmpty } from 'class-validator';

export class CategoriaDto {
  @IsNotEmpty({ message: 'el nombre no puede estar vacio' })
  nombre: string;
}
