import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductoFavDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
