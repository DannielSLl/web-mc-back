import { Controller, Get, Post, Param, Body, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { ClientesService } from './clientes.service';
import { ClienteEntity } from './cliente.entity';
import { ClienteDTO } from './dto/cliente.dto';
import { ClienteUpdateDTO } from './dto/clienteUpdateDTO';
import { UpdateResult } from 'typeorm';

@ApiTags('clientes') 
@Controller('clientes')
export class ClientesController {
    constructor(private clienteService: ClientesService) {}

    @Get()
    @ApiOperation({ summary: 'Obtener todos los clientes' }) 
    @ApiResponse({ status: 200, description: 'Clientes encontrados.', type: ClienteEntity, isArray: true }) // Descripción de la respuesta
    public async getClientes() {
        return await this.clienteService.getAllClientes();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un cliente por su ID' }) // Descripción del endpoint
    @ApiParam({ name: 'id', type: 'number', description: 'ID del cliente' }) // Descripción del parámetro
    @ApiResponse({ status: 200, description: 'Cliente encontrado.', type: ClienteEntity }) // Descripción de la respuesta
    public async getCliente(@Param('id', ParseIntPipe) id: number){
        return await this.clienteService.getCliente(id);
    }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo cliente' }) // Descripción del endpoint
    @ApiBody({ type: ClienteDTO }) // Especifica el tipo de cuerpo esperado en la solicitud
    @ApiResponse({ status: 200, description: 'Cliente agregado correctamente.', type: ClienteEntity }) // Descripción de la respuesta
    async postCliente(@Body() request: ClienteDTO): Promise<ClienteEntity> {
        return await this.clienteService.create(request);
    }
    
    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un cliente existente por su ID' }) // Descripción del endpoint
    @ApiParam({ name: 'id', type: 'number', description: 'ID del cliente' }) // Descripción del parámetro
    @ApiBody({ type: ClienteUpdateDTO }) // Especifica el tipo de cuerpo esperado en la solicitud
    @ApiResponse({ status: 200, description: 'Cliente actualizado correctamente.', type: UpdateResult }) // Descripción de la respuesta
    async putCliente(
        @Param('id') id: number,
        @Body() request: ClienteUpdateDTO,
    ): Promise<UpdateResult> {
        return await this.clienteService.update(id, request);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un cliente por su ID' }) // Descripción del endpoint
    @ApiParam({ name: 'id', type: 'number', description: 'ID del cliente' }) // Descripción del parámetro
    @ApiResponse({ status: 200, description: 'Cliente eliminado correctamente.' }) // Descripción de la respuesta
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.clienteService.delete(id);
    }
}
