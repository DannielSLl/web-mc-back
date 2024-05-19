import { IsNotEmpty } from 'class-validator';

export class IngredienteDto {
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  unidad: string;
}
