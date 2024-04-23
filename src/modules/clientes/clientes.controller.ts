import { Controller, Get, Post, Param, Body, Put, Res, Delete } from '@nestjs/common';
import { IGetClienteResponse } from './dto/iGetClienteResponse';
import { IPostClienteRequest } from './dto/iPostClienteRequest';
import { IPostClienteResponse } from './dto/iPostClienteResponse';
import { Response } from 'express'; // Importa Response desde express
import { IPutClienteRequest } from './dto/iPutClienteRequest';
import { ClientesService } from './clientes.service';
import { ClienteEntity } from './cliente.entity';

@Controller('clientes')
export class ClientesController {
    private clientes: IGetClienteResponse[] = [
    ];

    constructor(private clienteService: ClientesService) {}

    @Get()
    public async getClientes(): Promise<IGetClienteResponse[]> {
        return this.clientes;
    }

    @Get(':id')
    public async getCliente(@Param('id') id: number): Promise<IGetClienteResponse> {
        const cliente: IGetClienteResponse = this.clientes.find(
            e => e.id == id
        );
        return cliente;
    }

    @Post()
    async postCliente(@Body() request: IPostClienteRequest): Promise<IPostClienteResponse> {
        const response: IPostClienteResponse = {
            data: null,
            statusCode: 200,
            statusDescripcion: 'usuario agregado',
            error: null
        };

        if (request) {
            const newCliente: ClienteEntity = {
                name: request.name,
                lastname: request.lastname,
                email: request.email,
                phone: request.phone,
                password: request.password,
                puntos: request.puntos, 
            } as ClienteEntity;

            //this.clientes.push(newCliente);

            await this.clienteService.create(newCliente);

            return response;
        }
    }
    
    @Put(':id')
    async putCliente(
        @Param('id') id: number,
        @Body() request: IPutClienteRequest,
        @Res() response: Response,
    ): Promise<Response> {
        //Validad y verificar datos recibidos
        if (isNaN(id)) return response.status(400).send();

        //Buscar usuario
        this.clientes.find((cliente) => {

            //modificar info no nula
            if (cliente.id == id) {
                cliente.name = request?.name != '' ? request?.name : cliente.name;
                cliente.lastname = request?.lastname != '' ? request?.lastname : cliente.lastname;
                cliente.email = request?.email != '' ? request?.email : cliente.email;
                cliente.phone = !isNaN(request?.phone) ? request?.phone : cliente.phone;
                cliente.password = request?.password != '' ? request?.password : cliente.password;
                cliente.puntos = !isNaN(request?.puntos) ? request?.puntos : cliente.puntos;
            }
        });
        
        return response.status(202).send();
    }

    @Delete(':id')
    async deleteCliente(
        @Param('id') id: number,
        @Res() response: Response
    ): Promise<Response> {
        if (isNaN(id)) return response.status(400).send(); //bad request

        let isClienteFound: boolean = false;

        this.clientes.filter(
            cliente => {
                if (cliente.id == id) {
                    this.clientes.splice(cliente.id, 1);
                    isClienteFound = true;
                }
            }
        );

        if (!isClienteFound) return response.status(404).send(); //not found

        return response.status(200).send(); //ok
    }
}


