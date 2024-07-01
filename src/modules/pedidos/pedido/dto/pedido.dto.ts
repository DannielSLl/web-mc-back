import { IsDate, IsString, IsArray, ValidateNested, IsBoolean, IsNumber, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { PedidoDetalleDTO } from '../../pedido-detalles/dto/pedido-detalle.dto';
import { ApiProperty } from '@nestjs/swagger';
export class PedidoDTO {
    @ApiProperty({
        description: 'Precio total del pedido',
        example: 10000,
      })
    @IsNotEmpty()
    @IsNumber()
    precioTotal: number; 
    
    @ApiProperty({
        description: 'Fecha de creacion del pedido',
        example: '2024-05-31 20:00:00',
      })
    @IsNotEmpty()
    @IsDate()
    fecha: Date;
    
    @ApiProperty({
        description: 'Fecha de entrega del pedido',
        example: '2024-05-31 22:30:00',
      })
    @IsNotEmpty()
    @IsDate()
    fechaEntrega: Date;
    
    @ApiProperty({
        description: 'Estado del pedido [Finalizado = true - En proceso = false]',
        example: false,
      })
    @IsNotEmpty()
    @IsBoolean()
    estado: boolean;

    @ApiProperty({
        description: 'Metodo de pago seleccionado',
        example: 'efectivo',
      })
    @IsNotEmpty()
    @IsString()
    metodoPago: string;
    
    @ApiProperty({
        description: 'ayuda aqui',
        example: 'ayuda aqui',
      })

      @ApiProperty({
        description: 'Detalles del pedido',
        type: [PedidoDetalleDTO],
        example: [
            {
                cantidad: 2,
                productoId: 1
            },
            {
                cantidad: 1,
                productoId: 3
            }
        ],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PedidoDetalleDTO)
    detalles: PedidoDetalleDTO[];
    
    @ApiProperty({
        description: 'ID del local al que llegará la solicitud del pedido',
        example: 1,
      })
    @IsNotEmpty()
    @IsNumber()
    localId: number;
    
    @ApiProperty({
        description: 'ID del cliente que ha hecho el pedido',
        example: 33,
      })
    @IsNotEmpty()
    @IsNumber()
    clienteId: number;
}