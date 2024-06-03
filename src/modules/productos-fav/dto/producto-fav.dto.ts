import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductoFavDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID del usuario' })
  userId: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID del producto' })
  productId: number;
}
