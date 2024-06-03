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
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { APP_GUARD } from '@nestjs/core';

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
    JwtModule.register({
      secret: 'clave_secreta', // Usa la misma clave secreta configurada en AppModule
      signOptions: { expiresIn: '24h' },
    }),
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
    CategoriaService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [TypeOrmModule],
})
export class LocalModule {}

