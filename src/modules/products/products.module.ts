import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaEntity } from '../categoria/categoria.entity';
import { ProductEntity } from './product.entity';
import { ProductsController } from './products.controller';
import { ProductService } from './products.service';
import { CategoriaService } from '../categoria/categoria.service';
import { LocalModule } from '../local/local.module';
import { LocalProductoEntity } from '../local/local-producto/local-producto.entity';
import { IngredientesModule } from '../ingredientes/ingredientes.module';
import { LocalIngredienteEntity } from '../local/local-ingrediente/local-ingrediente.entity';
import { LocalProductoService } from '../local/local-producto/local-producto.service';
import { LocalService } from '../local/local/local.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      LocalProductoEntity,
      CategoriaEntity,
    ]),
    forwardRef(() => LocalModule)
  ],
  controllers: [ProductsController],
  providers: [
    ProductService,
    CategoriaService,
    LocalProductoService,
    LocalService,
    ProductService,
    CategoriaService
  ],
  exports: [TypeOrmModule],
})
export class ProductsModule {}
