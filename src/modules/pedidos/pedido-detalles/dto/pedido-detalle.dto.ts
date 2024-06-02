import { IsNumber, IsString } from 'class-validator';

export class PedidoDetalleDTO {
  @IsNumber()
  cantidad: number;

  @IsNumber()
  productoId: number;
}