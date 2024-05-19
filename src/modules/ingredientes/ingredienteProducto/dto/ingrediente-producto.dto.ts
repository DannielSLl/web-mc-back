import { IsNotEmpty } from 'class-validator';

export class IngredienteProductoDto {
  @IsNotEmpty()
  gramos: number;

  @IsNotEmpty()
  cantidad: number;

  @IsNotEmpty()
  producto_id: number;

  @IsNotEmpty()
  ingrediente_id: number;
}
