import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { MetodoPagoService } from './metodo-pago.service';
import { MetodoPagoEntity } from '../metodo-pago/metodo-pago.entity';
import { MetodoPagoDTO } from './dto/metodo-pago.dto';

@ApiTags('metodo-pago')
@Controller('metodo-pago')
export class MetodoPagoController {
  constructor(private readonly metodoPagoService: MetodoPagoService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los métodos de pago' })
  @ApiResponse({ status: 200, description: 'Lista de métodos de pago' })
  findAll(): Promise<MetodoPagoEntity[]> {
    return this.metodoPagoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un método de pago por ID' })
  @ApiResponse({ status: 200, description: 'Método de pago encontrado' })
  @ApiResponse({ status: 404, description: 'Método de pago no encontrado' })
  findOne(@Param('id') id: string): Promise<MetodoPagoEntity> {
    return this.metodoPagoService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo método de pago' })
  @ApiResponse({ status: 201, description: 'Método de pago creado exitosamente' })
  @ApiBody({ type: MetodoPagoDTO })
  create(@Body() metodo_pago: MetodoPagoDTO): Promise<MetodoPagoEntity> {
    return this.metodoPagoService.create(metodo_pago);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un método de pago' })
  @ApiResponse({ status: 200, description: 'Método de pago actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Método de pago no encontrado' })
  update(@Param('id') id: string, @Body() updateData: Partial<MetodoPagoDTO>): Promise<void> {
    return this.metodoPagoService.update(+id, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un método de pago' })
  @ApiResponse({ status: 200, description: 'Método de pago eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Método de pago no encontrado' })
  remove(@Param('id') id: string): Promise<void> {
    return this.metodoPagoService.remove(+id);
  }
}
