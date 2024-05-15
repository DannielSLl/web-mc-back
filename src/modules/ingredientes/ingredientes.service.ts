import { Injectable } from '@nestjs/common';
import { IngredientesEntity } from './entity/ingredientes.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IngredienteDto } from './dto/ingrediente.dto';

@Injectable()
export class IngredientesService {
  constructor(
    @InjectRepository(IngredientesEntity)
    private ingredientesRepository: Repository<IngredientesEntity>,
  ) {}

  async getAll(): Promise<IngredientesEntity[]> {
    const list = await this.ingredientesRepository.find();
    return list;
  }

  async findById(id: number): Promise<IngredientesEntity> {
    const ingrediente = await this.ingredientesRepository
      .createQueryBuilder('ingredientes')
      .where('ingredientes.ingrediente_id = :id', { id })
      .getOne();
    return ingrediente;
  }

  async findByNombre(nombre: string): Promise<IngredientesEntity> {
    const ingrediente = await this.ingredientesRepository
      .createQueryBuilder('ingredientes')
      .where('ingredientes.nombre = :nombre', { nombre })
      .getOne();
    return ingrediente;
  }

  async create(dto: IngredienteDto): Promise<any> {
    const ingrediente = this.ingredientesRepository.create(dto);
    await this.ingredientesRepository.save(ingrediente);
    return { message: `Ingrediente ${ingrediente.nombre} creado` };
  }

  async update(id: number, dto: IngredienteDto): Promise<any> {
    const ingrediente = await this.findById(id);
    dto.nombre
      ? (ingrediente.nombre = dto.nombre)
      : (ingrediente.nombre = ingrediente.nombre);
    dto.unidad
      ? (ingrediente.unidad = dto.unidad)
      : (ingrediente.unidad = ingrediente.unidad);
    await this.ingredientesRepository.save(ingrediente);
    return { message: `Ingrediente ${ingrediente.nombre} actualizado` };
  }

  async delete(id: number): Promise<any> {
    const ingrediente = await this.findById(id);
    await this.ingredientesRepository.delete(ingrediente);
    return { message: `Ingrediente ${ingrediente.nombre} eliminado` };
  }
}
