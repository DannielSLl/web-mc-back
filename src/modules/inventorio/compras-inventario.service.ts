import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ComprasInventorioEntity } from './compras-inventario.entity';
import { ComprasInventorioDTO } from '../inventorio/dto/compras-inventario.dto';

@Injectable()
export class ComprasInventorioService {
  constructor(
    @InjectRepository(ComprasInventorioEntity)
    private comprasInventarioRepository: Repository<ComprasInventorioEntity>,
  ) {}

  async create(ComprasInventorioDTO: ComprasInventorioDTO): Promise<ComprasInventorioEntity> {
    const compras = this.comprasInventarioRepository.create(ComprasInventorioDTO);
    return this.comprasInventarioRepository.save(compras);
  }

  async findAll(): Promise<ComprasInventorioEntity[]> {
    return this.comprasInventarioRepository.find({ relations: ['ingrediente'] });
  }

  async findOne(id: number): Promise<ComprasInventorioEntity> {
    return this.comprasInventarioRepository.findOne({ where: { id }, relations: ['ingrediente'] });
  }

  async remove(id: number): Promise<void> {
    await this.comprasInventarioRepository.delete(id);
  }
}