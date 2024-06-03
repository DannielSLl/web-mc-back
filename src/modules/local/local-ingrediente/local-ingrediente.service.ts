import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocalIngredienteEntity } from './local-ingrediente.entity';
import { Repository } from 'typeorm';
import { LocalIngredienteDto } from './dto/local-ingrediente.dto';
import { LocalService } from '../local/local.service';
import { IngredientesService } from 'src/modules/ingredientes/ingredientes/ingredientes.service';

@Injectable()
export class LocalIngredienteService {
  constructor(
    @InjectRepository(LocalIngredienteEntity)
    private readonly localIngredienteRepository: Repository<LocalIngredienteEntity>,
    private readonly localService: LocalService,
    private readonly ingredienteService: IngredientesService,
  ) {}

  async getAll(): Promise<LocalIngredienteEntity[]> {
    return await this.localIngredienteRepository.find();
  }

  async findById(id: number): Promise<LocalIngredienteEntity> {
    return await this.localIngredienteRepository
      .createQueryBuilder('localIngredientes')
      .where('localIngredientes.id = :id', { id })
      .getOne();
  }

  async create(localIngredienteDto: LocalIngredienteDto): Promise<any> {
    const existingLocalIngrediente =
      await this.localIngredienteRepository.findOne({
        where: {
          local: { id: localIngredienteDto.local_id },
          ingrediente: { id: localIngredienteDto.ingrediente_id },
        },
      });

    if (existingLocalIngrediente) {
      throw new ConflictException(`El ingrediente ya esta asociado al local`);
    }
    const local = await this.localService.findById(
      localIngredienteDto.local_id,
    );
    const ingrediente = await this.ingredienteService.findById(
      localIngredienteDto.ingrediente_id,
    );

    const newLocalIngrediente = this.localIngredienteRepository.create({
      ...localIngredienteDto,
      local,
      ingrediente,
    });
    await this.localIngredienteRepository.save(newLocalIngrediente);
    return {
      message: `El ingrediente ${ingrediente.nombre} fue agregado al local ${local.nombre}`,
    };
  }
}
