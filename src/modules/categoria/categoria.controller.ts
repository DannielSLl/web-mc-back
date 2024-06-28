import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam, ApiBody, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'; 
import { CategoriaService } from './categoria.service';
import { CategoriaDto } from './dto/categoria.dto';

import { JwtAuthGuard } from 'src/guards/auth/auth.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Roles } from '../auth/roles.decorator';
@ApiBearerAuth()
@ApiTags('categoria')
@Controller('categoria')
export class CategoriaController {
  constructor(readonly categoriaSerice: CategoriaService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las categorías.' })
  @ApiResponse({ status: 200, description: 'Devuelve todas las categorías.', type: CategoriaDto, isArray: true })
  async getAll() {
    return await this.categoriaSerice.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoría por su ID.' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID de la categoría' }) 
  @ApiResponse({ status: 200, description: 'Devuelve una categoría por su ID.', type: CategoriaDto })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.categoriaSerice.findById(id);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoría.' }) 
  @ApiBody({ type: CategoriaDto }) 
  @ApiResponse({ status: 201, description: 'Crea una nueva categoría.', type: CategoriaDto }) 
  async create(@Body() dto: CategoriaDto) {
    return await this.categoriaSerice.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una categoría por su ID.' }) 
  @ApiParam({ name: 'id', type: 'number', description: 'ID de la categoría' }) 
  @ApiResponse({ status: 200, description: 'Elimina una categoría por su ID.' }) 
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.categoriaSerice.delete(id);
  }
}
