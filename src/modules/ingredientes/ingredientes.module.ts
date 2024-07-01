import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientesEntity } from './ingredientes/ingredientes.entity';
import { IngredientesProductosEntity } from './ingredienteProducto/ingredientes-productos.entity';
import { IngredientesController } from './ingredientes/ingredientes.controller';
import { IngredientesService } from './ingredientes/ingredientes.service';
import { IngredientesProductosService } from './ingredienteProducto/ingredientes-productos.service';
import { IngredientesProductosController } from './ingredienteProducto/ingredientes-productos.controller';
import { ProductService } from '../products/products.service';
import { ProductEntity } from '../products/product.entity';
import { CategoriaService } from '../categoria/categoria.service';
import { CategoriaEntity } from '../categoria/categoria.entity';
import { LocalIngredienteEntity } from '../local/local-ingrediente/local-ingrediente.entity';
import { LocalProductoEntity } from '../local/local-producto/local-producto.entity';
import { LocalProductoService } from '../local/local-producto/local-producto.service';
import { LocalModule } from '../local/local.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      IngredientesEntity,
      IngredientesProductosEntity,
      ProductEntity,
      CategoriaEntity,
      LocalProductoEntity,
    ]),
    forwardRef(() => LocalModule),
    forwardRef(() => ProductsModule),
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
