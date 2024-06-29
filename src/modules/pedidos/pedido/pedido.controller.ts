// pedido.controller.ts
import { Controller, Post, Body, Get, Put, ParseIntPipe, Param, UseGuards, Req, HttpException } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoDTO } from './dto/pedido.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { PedidoPendienteDTO } from './dto/pedidoPendiente.dto';

import { JwtAuthGuard } from 'src/guards/auth/auth.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Roles } from 'src/modules/auth/roles.decorator';

import { Request } from 'express';
import { AuthenticatedUser } from 'src/modules/auth/user.interface';

@ApiBearerAuth()
@ApiTags('pedidos')
@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Get()
  async getPedidoPendiente(): Promise<PedidoPendienteDTO[]> {
    return await this.pedidoService.getPedidosPedientes();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('cliente')
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo pedido' })
  @ApiResponse({ status: 201, description: 'Pedido creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiBody({ type: PedidoDTO })
  async createPedido(@Body() pedidoDto: PedidoDTO, @Req() req: Request) {
    const user = req.user as AuthenticatedUser;
    if (pedidoDto.clienteId === user.id){
      return await this.pedidoService.createPedido(pedidoDto);
    }else{
      throw new HttpException("El ID del cliente no coincide con el ID del usuario autenticado", 403);
    } 
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('empleado')
  @Put(':id')
  async markToComplete(@Param('id', ParseIntPipe) id: number) {
    return await this.pedidoService.markToComplete(id);
  }
}
