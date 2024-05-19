import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IngredientesProductosService } from './ingredientes-productos.service';
import { IngredienteProductoDto } from './dto/ingrediente-producto.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ingredientes-productos')
@Controller('ingredientes-productos')
export class IngredientesProductosController {
  constructor(
    private ingredientesProductosService: IngredientesProductosService,
  ) {}

  @Get(':id')
  async findIngredientesByProductid(
    @Param('id', ParseIntPipe) producto_id: number,
  ) {
    return await this.ingredientesProductosService.findIngredientesByProductId(
      producto_id,
    );
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  async createNewRelation(@Body() dto: IngredienteProductoDto) {
    return await this.ingredientesProductosService.createNewRelation(dto);
  }
}
