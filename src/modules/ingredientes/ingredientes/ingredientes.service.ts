import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IngredientesEntity } from './ingredientes.entity';
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
    try {
      const ingrediente = await this.ingredientesRepository
        .createQueryBuilder('ingredientes')
        .where('ingredientes.id = :id', { id })
        .getOne();
      return ingrediente;
    } catch (error) {
      throw new NotFoundException({ message: 'No existe el ingrediente' });
    }
  }

  async findByNombre(nombre: string): Promise<IngredientesEntity> {
    try {
      const ingrediente = await this.ingredientesRepository
        .createQueryBuilder('ingredientes')
        .where('ingredientes.nombre = :nombre', { nombre })
        .getOne();
      return ingrediente;
    } catch (error) {
      throw new NotFoundException({ message: 'No existe el ingrediente' });
    }
  }

  async create(dto: IngredienteDto): Promise<any> {
    if (await this.findByNombre(dto.nombre)) {
      throw new ConflictException({ message: 'Ya existe el ingrediente' });
    }
    const ingrediente = this.ingredientesRepository.create(dto);
    console.log(ingrediente);
    await this.ingredientesRepository.save(ingrediente);
    return { message: `Ingrediente ${ingrediente.nombre} creado` };
  }

  async update(id: number, dto: IngredienteDto): Promise<any> {
    if (await this.findByNombre(dto.nombre)) {
      throw new ConflictException({ message: 'Ya existe el ingrediente' });
    }
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
