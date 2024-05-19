import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { CategoriaService } from '../categoria/categoria.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    private categoriaService: CategoriaService,
  ) {}

  async getAll(): Promise<ProductEntity[]> {
    const list = await this.productRepository.find();
    if (!list.length) {
      throw new NotFoundException({ message: 'Lista esta vacia' });
    }
    return list;
  }

  async findById(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException( { message: `Producto con ID ${id} no encontrado`});
    }
    return product;
  }

  async findByNombre(nombre: string): Promise<ProductEntity> {
    const producto = await this.productRepository
      .createQueryBuilder('productos')
      .where('productos.nombre = :nombre', { nombre })
      .getOne();

    if (!producto) {
      throw new NotFoundException({message: `Producto con nombre ${nombre} no encontrado`});
    }
    return producto;
  }

  async create(dto: ProductDto): Promise<any> {
    const existingProduct = await this.findByNombre(dto.nombre);
    if (existingProduct) {
      throw new ConflictException(
        `El producto con nombre "${dto.nombre}" ya existe.`,
      );
    }

    const categoria = await this.categoriaService.findById(dto.categoriaId);
    if (categoria) {
      const producto = this.productRepository.create({
        ...dto,
        categoria: categoria,
      });
      await this.productRepository.save(producto);
      return { message: `Producto ${producto.nombre} creado` };
    } else {
      throw new NotFoundException(
        `La categoría con id ${dto.categoriaId} no existe.`,
      );
    }
  }

  async update(id: number, dto: ProductDto): Promise<any> {
    const existingProduct = await this.findByNombre(dto.nombre);
    if (existingProduct) {
      throw new ConflictException(
        `El producto con nombre "${dto.nombre}" ya existe.`,
      );
    }

    const producto = await this.findById(id);
    dto.nombre
      ? (producto.nombre = dto.nombre)
      : (producto.nombre = producto.nombre);
    dto.precio
      ? (producto.precio = dto.precio)
      : (producto.precio = producto.precio);
    dto.calorias
      ? (producto.calorias = dto.calorias)
      : (producto.calorias = producto.calorias);
    dto.description
      ? (producto.description = dto.description)
      : (producto.description = producto.description);
    dto.img ? (producto.img = dto.img) : (producto.img = producto.img);
    await this.productRepository.save(producto);
    return { message: `Producto ${producto.nombre} actualizado` };
  }

  async delete(id: number): Promise<any> {
    const producto = await this.findById(id);
    await this.productRepository.delete(producto);
    return { message: `Producto ${producto.nombre} eliminado` };
  }
}
