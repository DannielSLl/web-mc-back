import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';

import { LocalEntity } from './local/local.entity';
import { LocalIngredienteEntity } from './local-ingrediente/local-ingrediente.entity';
import { IngredientesEntity } from '../ingredientes/ingredientes/ingredientes.entity';
import { ProductEntity } from '../products/product.entity';
import { LocalProductoEntity } from './local-producto/local-producto.entity';
import { CategoriaEntity } from '../categoria/categoria.entity';

import { LocalService } from './local/local.service';
import { LocalIngredienteService } from './local-ingrediente/local-ingrediente.service';
import { IngredientesService } from '../ingredientes/ingredientes/ingredientes.service';
import { LocalProductoService } from './local-producto/local-producto.service';
import { ProductService } from '../products/products.service';
import { CategoriaService } from '../categoria/categoria.service';

import { LocalController } from './local/local.controller';
import { LocalIngredienteController } from './local-ingrediente/local-ingrediente.controller';
import { LocalProductoController } from './local-producto/local-producto.controller';

import { RolesGuard } from 'src/guards/roles/roles.guard';
import { ProductsModule } from '../products/products.module';
import { jwtConstanst } from 'src/jwtConstants';
import { JwtStrategy } from '../auth/jtw.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LocalEntity,
      LocalIngredienteEntity,
      IngredientesEntity,
      ProductEntity,
      LocalProductoEntity,
      CategoriaEntity,
    ]),
    forwardRef(() => ProductsModule),
    JwtModule.register({
      secret: jwtConstanst.secret,
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
    {
      provide: APP_GUARD,
      useClass: JwtModule,
    },
  ],
  exports: [TypeOrmModule, LocalProductoService],
})
export class LocalModule {}
