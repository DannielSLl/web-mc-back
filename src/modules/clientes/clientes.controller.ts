import { Controller, Get, Post, Param, Body, Put, Res, Delete, ParseIntPipe } from '@nestjs/common';
import { IGetClienteResponse } from './dto/iGetClienteResponse';
import { IPostClienteRequest } from './dto/iPostClienteRequest';
import { IPostClienteResponse } from './dto/iPostClienteResponse';
import { Response } from 'express'; // Importa Response desde express
import { IPutClienteRequest } from './dto/iPutClienteRequest';
import { ClientesService } from './clientes.service';
import { ClienteEntity } from './cliente.entity';
import { ClienteDTO } from './dto/cliente.dto';
import { ClienteUpdateDTO } from './dto/clienteUpdateDTO';
import { UpdateResult } from 'typeorm';
import * as bcrypt from 'bcryptjs';


@Controller('clientes')
export class ClientesController {

    constructor(private clienteService: ClientesService) {}

    @Get()
    public async getClientes() {
        return await this.clienteService.getAllClientes();
    }

    @Get(':id')
    public async getCliente(@Param('id', ParseIntPipe) id: number){
        return await this.clienteService.getCliente(id);
    }

    @Post()
    async postCliente(@Body() request: ClienteDTO): Promise<IPostClienteResponse> {
        const response: IPostClienteResponse = {
            data: null,
            statusCode: 200,
            statusDescripcion: 'usuario agregado',
            error: null
        };

        if (request) {
            //Encriptar contraseña 
            const hashedPassword = await bcrypt.hash(request.password, 10);

            //Crear nuevo usuario
            const newCliente: ClienteEntity = {
                name: request.name,
                lastname: request.lastname,
                email: request.email,
                phone: request.phone,
                password: hashedPassword,
                puntos: request.puntos, 
            } as ClienteEntity;

            await this.clienteService.create(newCliente);

            return response;
        }
    }
    
    @Put(':id')
    async putCliente(
        @Param('id') id: number,
        @Body() request: ClienteUpdateDTO,
    ): Promise<UpdateResult> {

        return await this.clienteService.update(id, request);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.clienteService.delete(id);
    }
}


