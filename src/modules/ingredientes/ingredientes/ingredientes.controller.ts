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
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('ingredientes')
@Controller('ingredientes')
export class IngredientesController {
  constructor(private readonly ingredientesService: IngredientesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los ingredientes' })
  @ApiResponse({ status: 200, description: 'Lista de ingredientes', type: [IngredienteDto] })
  async getAll() {
    return await this.ingredientesService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un ingrediente por su ID' })
  @ApiParam({ name: 'id', description: 'ID del ingrediente' })
  @ApiResponse({ status: 200, description: 'Ingrediente encontrado', type: IngredienteDto })
  @ApiResponse({ status: 404, description: 'Ingrediente no encontrado' })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.ingredientesService.findById(id);
  }

  @Get('nombre/:nombre')
  @ApiOperation({ summary: 'Obtener un ingrediente por su nombre' })
  @ApiParam({ name: 'nombre', description: 'Nombre del ingrediente' })
  @ApiResponse({ status: 200, description: 'Ingrediente encontrado', type: IngredienteDto })
  @ApiResponse({ status: 404, description: 'Ingrediente no encontrado' })
  async getOneByName(@Param('nombre') nombre: string) {
    return await this.ingredientesService.findByNombre(nombre);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Crear un nuevo ingrediente' })
  @ApiResponse({ status: 201, description: 'Ingrediente creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiBody({ type: IngredienteDto })
  async create(@Body() dto: IngredienteDto) {
    return await this.ingredientesService.create(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Actualizar un ingrediente por su ID' })
  @ApiParam({ name: 'id', description: 'ID del ingrediente' })
  @ApiResponse({ status: 200, description: 'Ingrediente actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Ingrediente no encontrado' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiBody({ type: IngredienteDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: IngredienteDto,
  ) {
    return await this.ingredientesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un ingrediente por su ID' })
  @ApiParam({ name: 'id', description: 'ID del ingrediente' })
  @ApiResponse({ status: 200, description: 'Ingrediente eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Ingrediente no encontrado' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.ingredientesService.delete(id);
  }
}