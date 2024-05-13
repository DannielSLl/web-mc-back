import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class ProductDto {
  @IsNotEmpty({ message: 'el nombre no puede estar vacio' })
  nombre: string;

  @IsNotEmpty({ message: 'la descripción no puede estar vacia' })
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1, { message: 'el precio debe de ser al menos de 1' })
  precio: number;

  @IsNumber()
  @IsNotEmpty({ message: 'las calorias no pueden estar vacias' })
  calorias: number;

  @IsNumber()
  @IsNotEmpty({ message: 'la categoria no puede estar vacia' })
  categoria_id: number;

  @IsNotEmpty({ message: 'la imagen no puede estar vacia' })
  img: string;
}
