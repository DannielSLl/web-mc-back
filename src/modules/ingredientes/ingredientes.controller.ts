import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  ParseIntPipe,
  Param,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { IngredientesService } from './ingredientes.service';
import { IngredienteDto } from './dto/ingrediente.dto';

@Controller('ingredientes')
export class IngredientesController {
  constructor(private readonly ingredientesService: IngredientesService) {}

  @Get()
  async getAll() {
    return await this.ingredientesService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.ingredientesService.findById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() dto: IngredienteDto) {
    return await this.ingredientesService.create(dto);
  }

  @Put(':id')
  async update(id: number, dto: any) {
    return await this.ingredientesService.update(id, dto);
  }

  @Delete(':id')
  async delete(id: number) {
    return await this.ingredientesService.delete(id);
  }
}
