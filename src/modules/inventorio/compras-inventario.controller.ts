import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ComprasInventorioService } from '../inventorio/compras-inventario.service';
import { ComprasInventorioDTO } from '../inventorio/dto/compras-inventario.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('compras-inventario')
@Controller('compras_inventario')
export class ComprasInventorioController{
  constructor(private readonly ComprasInventorioService: ComprasInventorioService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva compra' })
  @ApiResponse({ status: 201, description: 'Compra creada exitosamente' })
  @ApiBody({ type: ComprasInventorioDTO })
  async create(@Body() ComprasInventorioDTO: ComprasInventorioDTO) {
    return this.ComprasInventorioService.create(ComprasInventorioDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las compras' })
  @ApiResponse({ status: 200, description: 'Lista de compras' })
  async findAll() {
    return this.ComprasInventorioService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una compra por su ID' })
  @ApiParam({ name: 'id', description: 'ID de la compra' })
  @ApiResponse({ status: 200, description: 'Compra encontrada' })
  @ApiResponse({ status: 404, description: 'Compra no encontrada' })
  async findOne(@Param('id') id: number) {
    return this.ComprasInventorioService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una compra por su ID' })
  @ApiParam({ name: 'id', description: 'ID de la compra' })
  @ApiResponse({ status: 200, description: 'Compra eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Compra no encontrada' })
  async remove(@Param('id') id: number) {
    return this.ComprasInventorioService.remove(id);
  }
}
