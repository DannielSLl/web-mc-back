import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaEntity } from '../categoria/categoria.entity';
import { LocalProductoEntity } from '../local/local-producto/local-producto.entity';
import { ProductEntity } from './product.entity';
import { ProductsController } from './products.controller';
import { ProductService } from './products.service';
import { CategoriaService } from '../categoria/categoria.service';

@Module({
    imports: [
    TypeOrmModule.forFeature([
        ProductEntity,
        CategoriaEntity,
        LocalProductoEntity
      ]),
    ],
    controllers: [ProductsController],
    providers: [ProductService, CategoriaService],
})
export class ProductsModule {}
