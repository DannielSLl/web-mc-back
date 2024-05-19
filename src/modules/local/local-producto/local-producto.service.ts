import { LocalService } from './../local/local.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { LocalProductoEntity } from './local-producto.entity';
import { LocalProductoDto } from './dto/local-producto.dto';
import { ProductService } from 'src/modules/products/products.service';

@Injectable()
export class LocalProductoService {
  constructor(
    @InjectRepository(LocalProductoEntity)
    private localProductoRepository: Repository<LocalProductoEntity>,
    private localService: LocalService,
    private productoService: ProductService,
  ) {}

  async getAll(): Promise<LocalProductoEntity[]> {
    return await this.localProductoRepository.find();
  }

  async findById(id: number): Promise<LocalProductoEntity> {
    return await this.localProductoRepository
      .createQueryBuilder('localProducto')
      .where('localProducto.id = :id', { id })
      .getOne();
  }

  async create(dto: LocalProductoDto): Promise<any> {
    const existingLocalIngrediente = await this.localProductoRepository.findOne(
      {
        where: {
          local: { id: dto.local_id },
          producto: { id: dto.producto_id },
        },
      },
    );

    if (existingLocalIngrediente) {
      throw new ConflictException(`El producto ya esta asociado al local`);
    }
    const local = await this.localService.findById(dto.local_id);
    const producto = await this.productoService.findById(dto.producto_id);

    const newLocalIngrediente = this.localProductoRepository.create({
      ...dto,
      local,
      producto,
    });
    await this.localProductoRepository.save(newLocalIngrediente);
    return {
      message: `El ingrediente ${producto.nombre} fue agregado al local ${local.nombre}`,
    };
  }
}
