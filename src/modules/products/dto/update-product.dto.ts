import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class UpdateProductDto {
    
  nombre: string;

  description: string;

  precio: number;

  calorias: number;

  categoria: number;

  img: string;
}
