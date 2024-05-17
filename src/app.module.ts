import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesController } from './modules/clientes/clientes.controller';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEntity } from './modules/clientes/cliente.entity';
import { ClientesService } from './modules/clientes/clientes.service';
import { ProductEntity } from './modules/products/product.entity';
import { ProductService } from './modules/products/products.service';
import { ProductsController } from './modules/products/products.controller';
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

@Module({
  imports: [
    IngredientesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    TypeOrmModule.forFeature([
      ClienteEntity,
      ProductEntity,
      CategoriaEntity,
      EmployeesEntity,
    ]),
    JwtModule.register({
      secret: 'clave_secreta', //Cambiar luego
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [
    AppController,
    ClientesController,
    ProductsController,
    CategoriaController,
    EmployeesController,
    AuthController,
  ],
  providers: [
    AppService,
    ClientesService,
    ProductService,
    CategoriaService,
    EmployeesService,
    AuthService,
  ],
})
export class AppModule {}
