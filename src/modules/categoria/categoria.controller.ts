import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger'; 
import { CategoriaService } from './categoria.service';
import { CategoriaDto } from './dto/categoria.dto';

@ApiTags('categoria') 
@Controller('categoria')
export class CategoriaController {
  constructor(readonly categoriaService: CategoriaService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Devuelve todas las categorías.', type: CategoriaDto, isArray: true })
  async getAll() {
    return await this.categoriaService.getAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'number', description: 'ID de la categoría' })
  @ApiResponse({ status: 200, description: 'Devuelve una categoría por su ID.', type: CategoriaDto })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.categoriaService.findById(id);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  @ApiBody({ type: CategoriaDto }) 
  @ApiResponse({ status: 201, description: 'Crea una nueva categoría.', type: CategoriaDto }) 
  async create(@Body() dto: CategoriaDto) {
    return await this.categoriaService.create(dto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'number', description: 'ID de la categoría' })
  @ApiResponse({ status: 200, description: 'Elimina una categoría por su ID.' }) 
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.categoriaService.delete(id);
  }
}
