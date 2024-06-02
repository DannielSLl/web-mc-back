import { Module } from '@nestjs/common';
import { LocalEntity } from './local/local.entity';
import { LocalIngredienteEntity } from './local-ingrediente/local-ingrediente.entity';
import { IngredientesEntity } from '../ingredientes/ingredientes/ingredientes.entity';
import { ProductEntity } from '../products/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalService } from './local/local.service';
import { LocalController } from './local/local.controller';
import { LocalIngredienteController } from './local-ingrediente/local-ingrediente.controller';
import { LocalIngredienteService } from './local-ingrediente/local-ingrediente.service';
import { IngredientesService } from '../ingredientes/ingredientes/ingredientes.service';
import { LocalProductoService } from './local-producto/local-producto.service';
import { LocalProductoController } from './local-producto/local-producto.controller';
import { LocalProductoEntity } from './local-producto/local-producto.entity';
import { ProductService } from '../products/products.service';
import { CategoriaService } from '../categoria/categoria.service';
import { CategoriaEntity } from '../categoria/categoria.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LocalEntity,
      LocalIngredienteEntity,
      IngredientesEntity,
      ProductEntity,
      LocalProductoEntity,
      CategoriaEntity
    ]),
  ],
  controllers: [
    LocalController,
    LocalIngredienteController,
    LocalProductoController,
  ],
  providers: [
    LocalService,
    LocalIngredienteService,
    IngredientesService,
    LocalProductoService,
    ProductService,
    CategoriaService
  ],
  exports: [TypeOrmModule],
})
export class LocalModule {}

