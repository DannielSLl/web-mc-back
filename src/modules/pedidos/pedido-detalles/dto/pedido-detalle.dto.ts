import { IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class PedidoDetalleDTO {

  @ApiProperty({
    description: 'Cantidad del producto en el pedido',
    example: 2,
  })
  @IsNotEmpty()
  @IsNumber()
  cantidad: number;

  @ApiProperty({
    description: 'ID del producto',
    example: 1,
})
  @IsNotEmpty()
  @IsNumber()
  productoId: number;
}