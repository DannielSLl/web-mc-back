import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IngredienteDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nombre del ingrediente' })
  nombre: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Unidad del ingrediente' })
  unidad: string;
}
