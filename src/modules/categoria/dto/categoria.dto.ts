import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CategoriaDto {
  @ApiProperty({
    description: 'Nombre de la categoria',
    example: 'Hamburguesas',
  })
  @IsNotEmpty({ message: 'el nombre no puede estar vacio' })
  @IsString()
  nombre: string;

  @ApiProperty({
    description: 'Descripcion de la categoria',
    example: 'Encuentra la variedad de hamburguesas ofrecidas por nuestra tienda',
  })
  @IsNotEmpty({ message: 'el nombre no puede estar vacio' })
  @IsString()
  url: string;
}
