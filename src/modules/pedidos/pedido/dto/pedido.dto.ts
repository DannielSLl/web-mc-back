import { IsDate, IsString, IsArray, ValidateNested, IsBoolean, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { PedidoDetalleDTO } from '../../pedido-detalles/dto/pedido-detalle.dto';

export class PedidoDTO {
    @IsNumber()
    precioTotal: number; 

    @IsDate()
    fecha: Date;

    @IsDate()
    fechaEntrega: Date;

    @IsBoolean()
    estado: boolean;

    @IsString()
    metodoPago: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PedidoDetalleDTO)
    detalles: PedidoDetalleDTO[];

    @IsNumber()
    localId: number;

    @IsNumber()
    clienteId: number;
}