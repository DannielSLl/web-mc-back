import { Controller, Post, Body, Get, Put, ParseIntPipe, Param, UseGuards, Req, HttpException } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoDTO } from './dto/pedido.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { PedidoPendienteDTO } from './dto/pedidoPendiente.dto';

@ApiBearerAuth()
@ApiTags('pedidos')
@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}
  
  @Get()
  async getPedidoPendiente(): Promise<PedidoPendienteDTO[]> {
    return await this.pedidoService.getPedidosPedientes();
  }

  @Get(':id') 
  async getPedidoDetail(@Param('id', ParseIntPipe) id: number) {
    return await this.pedidoService.getPedidoDetail(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo pedido' })
  @ApiResponse({ status: 201, description: 'Pedido creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiBody({ type: PedidoDTO })
  async createPedido(@Body() pedidoDto: PedidoDTO) {
    console.log(pedidoDto);
      return await this.pedidoService.createPedido(pedidoDto);
  }

  @Put(':id')
  async markToComplete(@Param('id', ParseIntPipe) id: number) {
    return await this.pedidoService.markToComplete(id);
  }
}
