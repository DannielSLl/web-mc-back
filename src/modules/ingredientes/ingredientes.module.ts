import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientesEntity } from './entity/ingredientes.entity';
import { IngredientesProductosEntity } from './entity/ingredientes-productos.entity';
import { IngredientesController } from './ingredientes.controller';
import { IngredientesService } from './ingredientes.service';
import { IngredientesProductosService } from './ingredientes-productos.service';
import { IngredientesProductosController } from './ingredientes-productos.controller';
import { ProductService } from '../products/products.service';
import { ProductEntity } from '../products/product.entity';
import { CategoriaService } from '../categoria/categoria.service';
import { CategoriaEntity } from '../categoria/categoria.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      IngredientesEntity,
      IngredientesProductosEntity,
      ProductEntity,
      CategoriaEntity,
    ]),
  ],
  controllers: [IngredientesController, IngredientesProductosController],
  providers: [
    IngredientesService,
    IngredientesProductosService,
    ProductService,
    CategoriaService,
  ],
})
export class IngredientesModule {}
