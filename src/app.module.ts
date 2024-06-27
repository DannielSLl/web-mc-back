import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientesController } from './modules/clientes/clientes.controller';
import { ClienteEntity } from './modules/clientes/cliente.entity';
import { ClientesService } from './modules/clientes/clientes.service';

import { CategoriaEntity } from './modules/categoria/categoria.entity';
import { CategoriaService } from './modules/categoria/categoria.service';
import { CategoriaController } from './modules/categoria/categoria.controller';

import { EmployeesEntity } from './modules/employees/employees.entity';
import { EmployeesService } from './modules/employees/employees.service';
import { EmployeesController } from './modules/employees/employees.controller';

import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';

import { JwtModule } from '@nestjs/jwt';

import { IngredientesModule } from './modules/ingredientes/ingredientes.module';

import { LocalModule } from './modules/local/local.module';

import { ProductsModule } from './modules/products/products.module';
import { ProductService } from './modules/products/products.service';
import { ProductEntity } from './modules/products/product.entity';

import { PedidoController } from './modules/pedidos/pedido/pedido.controller';
import { PedidoEntity } from './modules/pedidos/pedido/pedido.entity';
import { PedidoDetalleEntity } from './modules/pedidos/pedido-detalles/pedido-detalle.entity';
import { PedidoService } from './modules/pedidos/pedido/pedido.service';

import { AdminEntity } from './modules/admin/admin.entity';
import { AdminController } from './modules/admin/admin.controller';
import { AdminService } from './modules/admin/admin.service';

import { ProductosFavModule } from './modules/productos-fav/productos-fav.module';
import { ProductoFavEntity } from './modules/productos-fav/producto-fav.entity';
import { ProductosFavService } from './modules/productos-fav/productos-fav.service';
import { ProductosFavController } from './modules/productos-fav/productos-fav.controller';


import { jwtConstanst } from './jwtConstants';
import { JwtStrategy } from './modules/auth/jtw.strategy';
import { RolesGuard } from './guards/roles/roles.guard';


@Module({
  imports: [
    LocalModule,
    IngredientesModule,
    ProductsModule,
    ProductosFavModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    TypeOrmModule.forFeature([
      ClienteEntity,
      CategoriaEntity,
      EmployeesEntity,
      PedidoEntity,
      PedidoDetalleEntity,
      ProductEntity,
      AdminEntity,
      ProductoFavEntity
    ]),
    JwtModule.register({
      secret: jwtConstanst.secret, //Cambiar luego
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [
    AppController,
    ClientesController,
    CategoriaController,
    EmployeesController,
    AuthController,
    PedidoController,
    AdminController,
    ProductosFavController
  ],
  providers: [
    AppService,
    ClientesService,
    CategoriaService,
    EmployeesService,
    AuthService,
    PedidoService,
    AdminService,
    ProductosFavService,
    ProductService,
    JwtStrategy,
    RolesGuard
  ],
  exports: [
    JwtModule,
  ]
})
export class AppModule {}
