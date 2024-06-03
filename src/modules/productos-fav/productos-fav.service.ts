import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductoFavEntity } from './producto-fav.entity';
import { CreateProductoFavDto } from '../productos-fav/dto/producto-fav.dto';
import { ClientesService } from '../clientes/clientes.service';
import { ProductService } from '../products/products.service';


@Injectable()
export class ProductosFavService {
  constructor(
    @InjectRepository(ProductoFavEntity)
    private productosFavRepository: Repository<ProductoFavEntity>,
    private clientesService: ClientesService,
    private productoService: ProductService
  ) {}

  async findAll(): Promise<ProductoFavEntity[]> {
    const list = await this.productosFavRepository.find({ relations: ['cliente', 'producto'] });
    if (!list.length) {
      throw new NotFoundException({ message: 'Lista esta vacia' });
    }
    return list;
}


  async findByUser(userId: number): Promise<ProductoFavEntity[]> {
    const productFavs = await this.productosFavRepository.find({ where: { cliente: { id: userId } } });
    if (!productFavs.length) {
      throw new NotFoundException({ message: `Productos favoritos para el usuario con ID ${userId} no encontrados` });
    }
    return productFavs;
  }
  
  async create(createProductoFavDto: CreateProductoFavDto): Promise<any> {
    const { userId, productId } = createProductoFavDto;
    const cliente = await this.clientesService.getCliente(userId);
    if (!cliente) {
      throw new NotFoundException('Cliente no encontrado');
    }
    const producto = await this.productoService.findById(productId);
    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }
    const newProductFav = this.productosFavRepository.create({ cliente, producto });
    await this.productosFavRepository.save(newProductFav);
    return { message: 'Producto favorito agregado exitosamente' };
  }  

  async remove(id: number): Promise<{ message: string }> {
    const productFav = await this.productosFavRepository.findOne({ where: { id } });
    if (!productFav) {
      throw new NotFoundException({ message: `Producto favorito con ID ${id} no encontrado` });
    }
    await this.productosFavRepository.delete(id);
    
    return { message: `Producto favorito eliminado` };
  }
  
}
