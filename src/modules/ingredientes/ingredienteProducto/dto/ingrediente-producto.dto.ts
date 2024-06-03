import { IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IngredienteProductoDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID del ingrediente' })
  ingrediente_id: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID del producto' })
  producto_id: number;
}
