import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaEntity } from '../categoria/categoria.entity';
import { ProductEntity } from './product.entity';
import { ProductsController } from './products.controller';
import { ProductService } from './products.service';
import { CategoriaService } from '../categoria/categoria.service';

@Module({
    imports: [
    TypeOrmModule.forFeature([
        ProductEntity,
        CategoriaEntity,
      ]),
    ],
    controllers: [ProductsController],
    providers: [ProductService, CategoriaService],
    exports: [TypeOrmModule],
})
export class ProductsModule {}
