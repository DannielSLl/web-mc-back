import { IsNotEmpty } from 'class-validator';

export class IngredienteProductoDto {
  @IsNotEmpty()
  gramos: number;

  @IsNotEmpty()
  cantidad: number;
}
