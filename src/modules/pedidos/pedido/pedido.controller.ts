// pedido.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoDTO } from './dto/pedido.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('pedidos')
@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo pedido' })
  @ApiResponse({ status: 201, description: 'Pedido creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiBody({ type: PedidoDTO })
  async createPedido(@Body() pedidoDto: PedidoDTO) {
    return await this.pedidoService.createPedido(pedidoDto);
  }
}
