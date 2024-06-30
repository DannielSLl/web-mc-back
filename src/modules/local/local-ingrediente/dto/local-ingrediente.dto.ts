import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LocalIngredienteDto {
  @ApiProperty({
    description: 'Cantidad del ingrediente en el local',
    example: 100
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
    description: 'ID del ingrediente',
    example: 5
  })
  @IsNotEmpty()
  @IsNumber()
  ingrediente_id: number;
}
