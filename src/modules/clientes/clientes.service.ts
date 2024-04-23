import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClienteEntity } from './cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientesService {
    constructor(
        @InjectRepository(ClienteEntity) private readonly clienteRepository: Repository<ClienteEntity>
    ){}

    public async create(cliente: ClienteEntity): Promise<ClienteEntity> {
        const result = this.clienteRepository.create(cliente);

        return await this.clienteRepository.save(result);
    }
}
