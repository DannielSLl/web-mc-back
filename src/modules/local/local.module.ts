import { Module } from '@nestjs/common';
import { LocalEntity } from './local/local.entity';
import { LocalIngredienteEntity } from './local-ingrediente/local-ingrediente.entity';
import { LocalProductoEntity } from './local-producto/local-producto.entity';
import { IngredientesEntity } from '../ingredientes/ingredientes/ingredientes.entity';
import { ProductEntity } from '../products/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LocalEntity,
      LocalIngredienteEntity,
      LocalProductoEntity,
      IngredientesEntity,
      ProductEntity,
    ]),
  ],
  controllers: [],
  providers: [],
})
export class LocalModule {}
