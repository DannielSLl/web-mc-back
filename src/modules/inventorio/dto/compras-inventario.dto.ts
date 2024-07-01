import { IsNotEmpty, IsNumber, IsDateString, isDateString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComprasInventorioDTO {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID del ingrediente' })
  ingrediente_id: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Cantidad comprada' })
  cantidad: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Precio total de la compra' })
  precio: number;
}
