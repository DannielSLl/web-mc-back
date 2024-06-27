import { Controller, Get, Post, Param, Body, Put, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { IPostClienteResponse } from './dto/iPostClienteResponse';
import { ClientesService } from './clientes.service';
import { ClienteEntity } from './cliente.entity';
import { ClienteDTO } from './dto/cliente.dto';
import { ClienteUpdateDTO } from './dto/clienteUpdateDTO';
import { UpdateResult } from 'typeorm';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import * as bcrypt from 'bcryptjs';
import { JwtAuthGuard } from 'src/guards/auth/auth.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiBearerAuth()
@ApiTags('clientes')
@Controller('clientes')
export class ClientesController {

    constructor(private clienteService: ClientesService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Get()
    @ApiOperation({ summary: 'Obtener todos los clientes' })
    @ApiResponse({ status: 200, description: 'Clientes encontrados.', type: ClienteEntity, isArray: true }) 
    public async getClientes() {
        return await this.clienteService.getAllClientes();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un cliente por su ID' }) 
    @ApiParam({ name: 'id', type: 'number', description: 'ID del cliente' }) 
    @ApiResponse({ status: 200, description: 'Cliente encontrado.', type: ClienteEntity }) 
    public async getCliente(@Param('id', ParseIntPipe) id: number){
        return await this.clienteService.getCliente(id);
    }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo cliente' }) 
    @ApiBody({ type: ClienteDTO })
    @ApiResponse({ status: 200, description: 'Cliente agregado correctamente.', type: ClienteEntity })
    async postCliente(@Body() request: ClienteDTO): Promise<IPostClienteResponse> {
        const response: IPostClienteResponse = {
            data: null,
            statusCode: 200,
            statusDescripcion: 'usuario agregado',
            error: null
        };

        if (request) {
            const hashedPassword = await bcrypt.hash(request.password, 10);

            const newCliente: ClienteEntity = {
                name: request.name,
                lastname: request.lastname,
                email: request.email,
                phone: request.phone,
                password: hashedPassword,
                puntos: 0, 
            } as ClienteEntity;

            await this.clienteService.create(newCliente);

            return response;
        }
    }
    
    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un cliente existente por su ID' }) 
    @ApiParam({ name: 'id', type: 'number', description: 'ID del cliente' }) 
    @ApiBody({ type: ClienteUpdateDTO }) 
    @ApiResponse({ status: 200, description: 'Cliente actualizado correctamente.', type: UpdateResult }) 
    async putCliente(
        @Param('id') id: number,
        @Body() request: ClienteUpdateDTO,
    ): Promise<UpdateResult> {

        return await this.clienteService.update(id, request);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un cliente por su ID' }) 
    @ApiParam({ name: 'id', type: 'number', description: 'ID del cliente' }) 
    @ApiResponse({ status: 200, description: 'Cliente eliminado correctamente.' })
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.clienteService.delete(id);
    }
}


