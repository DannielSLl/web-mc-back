import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LocalProductoDto {
  @ApiProperty({
    description: 'Cantidad del producto en el local',
    example: 50
  })
  @IsNotEmpty()
  @IsNumber()
  cantidad: number;

  @ApiProperty({
    description: 'ID del local',
    example: 1
  })
  @IsNotEmpty()
  @IsNumber()
  local_id: number;

  @ApiProperty({
    description: 'ID del producto',
    example: 10
  })
  @IsNotEmpty()
  @IsNumber()
  producto_id: number;
}
