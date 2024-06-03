import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriaEntity } from './categoria.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaDto } from './dto/categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(CategoriaEntity)
    private categoriaRepository: Repository<CategoriaEntity>,
  ) {}

  async getAll(): Promise<CategoriaEntity[]> {
    const list = await this.categoriaRepository
      .createQueryBuilder('categorias')
      .getMany();
    if (!list.length) {
      throw new NotFoundException({ message: 'Lista esta vacia' });
    }
    return list;
  }

  async findById(id: number): Promise<CategoriaEntity> {
    const producto = await this.categoriaRepository
      .createQueryBuilder('categorias')
      .where('categorias.id = :id', { id })
      .getOne();
    if (!producto) {
      throw new NotFoundException({
        message: 'No existe la categoria',
      });
    }
    return producto;
  }
  async create(dto: CategoriaDto): Promise<any> {
    const categoria = this.categoriaRepository.create(dto);
    await this.categoriaRepository.save(categoria);
    return { message: `Categoria ${categoria.nombre} creada` };
  }
  async delete(id: number): Promise<any> {
    const categoria = await this.findById(id);
    await this.categoriaRepository.delete(categoria);
    return { message: `Categoria ${categoria.nombre} eliminada` };
  }
}
