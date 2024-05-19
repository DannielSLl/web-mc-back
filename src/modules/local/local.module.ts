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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LocalEntity,
      LocalIngredienteEntity,
      IngredientesEntity,
      ProductEntity,
    ]),
  ],
  controllers: [LocalController, LocalIngredienteController, ],
  providers: [LocalService, LocalIngredienteService, IngredientesService],
})
export class LocalModule {}
