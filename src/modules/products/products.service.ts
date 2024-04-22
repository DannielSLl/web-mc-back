import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private productoRepository: Repository<ProductEntity>,
      ) {}
    
      async getAll(): Promise<ProductEntity[]> {
        const list = await this.productoRepository.find();
        if (!list.length) {
          throw new NotFoundException({ message: 'Lista esta vacia' });
        }
        return list;
      }
    
      async findById(id: number): Promise<ProductEntity> {
        const producto = await this.productoRepository
          .createQueryBuilder('productos')
          .where('productos.id = :id', { id })
          .getOne();
        if (!producto) {
          throw new NotFoundException({ message: 'No existe' });
        }
        return producto;
      }
    
      async findByNombre(nombre: string): Promise<ProductEntity> {
        const producto = await this.productoRepository
          .createQueryBuilder('productos')
          .where('productos.nombre = :nombre', { nombre })
          .getOne();
        return producto;
      }
    
      async create(dto: ProductDto): Promise<any> {
        const producto = this.productoRepository.create(dto);
        await this.productoRepository.save(producto);
        return { message: `Producto ${producto.nombre} creado` };
      }
    
      async update(id: number, dto: ProductDto): Promise<any> {
        const producto = await this.findById(id);
        dto.nombre
          ? (producto.nombre = dto.nombre)
          : (producto.nombre = producto.nombre);
        dto.precio
          ? (producto.precio = dto.precio)
          : (producto.precio = producto.precio);
        await this.productoRepository.save(producto);
        return { message: `Producto ${producto.nombre} actualizado` };
      }
    
      async delete(id: number): Promise<any> {
        const producto = await this.findById(id);
        await this.productoRepository.delete(producto);
        return { message: `Producto ${producto.nombre} eliminado` };
      }
}
