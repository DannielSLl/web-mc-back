import { forwardRef, Module } from '@nestjs/common';
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
import { LocalProductoEntity } from '../local/local-producto/local-producto.entity';
import { LocalModule } from '../local/local.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductoFavEntity,
      ClienteEntity,
      ProductEntity,
      CategoriaEntity,
      LocalProductoEntity,
    ]),
    forwardRef(() => LocalModule),
    forwardRef(() => ProductsModule),
  ],
  providers: [
    ProductosFavService,
    ClientesService,
    ProductService,
    CategoriaService,
  ],
  controllers: [ProductosFavController, ProductsController],
  exports: [TypeOrmModule],
})
export class ProductosFavModule {}
