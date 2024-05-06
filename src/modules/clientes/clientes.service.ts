import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClienteEntity } from './cliente.entity';
import { Repository, UpdateResult } from 'typeorm';
import { ClienteUpdateDTO } from './dto/clienteUpdateDTO';

@Injectable()
export class ClientesService {
    constructor(
        @InjectRepository(ClienteEntity)
        private clienteRepository: Repository<ClienteEntity>
    ){}

    public async getAllClientes(): Promise<ClienteEntity[]> {
        const result = this.clienteRepository.find();

        return result;
    }

    public async getCliente(id: number): Promise <ClienteEntity> {
        try {
            const result = await this.clienteRepository.createQueryBuilder('clientes').where(
                'clientes.id = :id', {id}
            ).getOne()

            return result;
        }
        catch(error: any) {
            throw new Error(error);
        }
    }

    public async create(cliente: ClienteEntity): Promise<ClienteEntity> {
        const result = this.clienteRepository.create(cliente);

        return await this.clienteRepository.save(result);
    }

    public async update(id: number, cliente: ClienteUpdateDTO): Promise<UpdateResult> {
        const result: UpdateResult = await this.clienteRepository.update(id, cliente);

        if (result.affected == 0) {
            //No se realizo ningun cambio
            return undefined;
        }
        return result;
    }

    public async delete(id: number): Promise<any> {
        const cliente =  await this.getCliente(id);
        await this.clienteRepository.delete(cliente.id);
        return { message: 'Cliente ' + cliente.name + ' ' + cliente.lastname + ' eliminado'}
    }

    public async findOneByEmail(email: string): Promise <ClienteEntity> {
        try {
            return await this.clienteRepository.findOneBy({email})
        }
        catch(error: any) {
            throw new Error(error);
        }
    }
}
