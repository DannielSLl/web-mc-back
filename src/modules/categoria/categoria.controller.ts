import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaDto } from './dto/categoria.dto';

@Controller('categoria')
export class CategoriaController {
  constructor(readonly categoriaSerice: CategoriaService) {}

  @Get()
  async getAll() {
    return await this.categoriaSerice.getAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.categoriaSerice.findById(id);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  async create(@Body() dto: CategoriaDto) {
    return await this.categoriaSerice.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.categoriaSerice.delete(id);
  }
}
