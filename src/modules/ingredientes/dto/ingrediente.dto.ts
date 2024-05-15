import { IsNotEmpty } from 'class-validator';

export class IngredienteDto {
  @IsNotEmpty({ message: 'El nombre no puede estar vacio' })
  nombre: string;

  @IsNotEmpty({ message: 'La unidad no puede estar vacia' })
  unidad: string;
}
