import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesController } from './modules/clientes/clientes.controller';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEntity } from './modules/clientes/cliente.entity';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    DatabaseModule,
    TypeOrmModule.forFeature([ClienteEntity])
  ],
  controllers: [AppController, ClientesController],
  providers: [AppService],
})
export class AppModule {}
