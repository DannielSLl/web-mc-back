import { InjectRepository } from '@nestjs/typeorm';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LocalEntity } from './local.entity';
import { Repository } from 'typeorm';
import { LocalDto } from './dto/local.dto';

@Injectable()
export class LocalService {
  constructor(
    @InjectRepository(LocalEntity)
    private readonly localRepository: Repository<LocalEntity>,
  ) {}

  async getAll(): Promise<LocalEntity[]> {
    return await this.localRepository.find();
  }

  async findById(id: number): Promise<LocalEntity> {
    const local = await this.localRepository
      .createQueryBuilder('locales')
      .where('locales.id = :id', { id })
      .getOne();
    if (!local) {
      throw new NotFoundException({ message: 'No existe el local' });
    }
    return local;
  }

  async findByNombre(nombre: string): Promise<LocalEntity> {
    const producto = await this.localRepository
      .createQueryBuilder('productos')
      .where('productos.nombre = :nombre', { nombre })
      .getOne();
    return producto;
  }

  async create(dto: LocalDto): Promise<any> {
    const existingProduct = await this.findByNombre(dto.nombre);
    if (existingProduct) {
      throw new ConflictException(
        `El producto con nombre "${dto.nombre}" ya existe.`,
      );
    }
    const newLocal = this.localRepository.create(dto);
    await this.localRepository.save(newLocal);
    return { message: `Local ${newLocal.nombre} creado` };
  }

  async delete(id: number): Promise<any> {
    const local = await this.findById(id);
    await this.localRepository.remove(local);
    return { message: `Local ${local.nombre} eliminado` };
  }
}
