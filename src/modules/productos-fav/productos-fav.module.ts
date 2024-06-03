import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEntity } from '../clientes/cliente.entity';
import { ClientesService } from '../clientes/clientes.service';
import { ProductEntity } from '../products/product.entity';
import { ProductService } from '../products/products.service';
import { ProductsController } from '../products/products.controller';
import { ProductoFavEntity } from './producto-fav.entity';
import { ProductosFavController } from './productos-fav.controller';
import { ProductosFavService } from './productos-fav.service';
import { CategoriaService } from '../categoria/categoria.service';  
import { CategoriaEntity } from '../categoria/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    ProductoFavEntity, 
    ClienteEntity, 
    ProductEntity,
    CategoriaEntity])],
  providers: [ProductosFavService, ClientesService, ProductService, CategoriaService],
  controllers: [ProductosFavController,ProductsController],
  exports: [TypeOrmModule],
})
export class ProductosFavModule {}
