import { IsNotEmpty } from 'class-validator';

export class LocalDto {
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  ciudad: string;

  @IsNotEmpty()
  direccion: string;
}
