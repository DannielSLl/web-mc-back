import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { IngredientesProductosService } from './ingredientes-productos.service';
import { IngredienteProductoDto } from './dto/ingrediente-producto.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('ingredientes-productos')
@Controller('ingredientes-productos')
export class IngredientesProductosController {
  constructor(
    private ingredientesProductosService: IngredientesProductosService,
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'Obtener ingredientes por ID de producto' })
  @ApiParam({ name: 'id', description: 'ID del producto' })
  @ApiResponse({ status: 200, description: 'Ingredientes encontrados' })
  @ApiResponse({ status: 404, description: 'No se encontraron ingredientes para el producto' })
  async findIngredientesByProductId(
    @Param('id', ParseIntPipe) producto_id: number,
  ) {
    return await this.ingredientesProductosService.findIngredientesByProductId(
      producto_id,
    );
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Crear una nueva relación de ingrediente y producto' })
  @ApiResponse({ status: 201, description: 'Relación creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiBody({ type: IngredienteProductoDto })
  async createNewRelation(@Body() dto: IngredienteProductoDto) {
    return await this.ingredientesProductosService.createNewRelation(dto);
  }
}
