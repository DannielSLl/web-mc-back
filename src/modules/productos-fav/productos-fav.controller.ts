import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ProductosFavService } from './productos-fav.service';
import { CreateProductoFavDto } from '../productos-fav/dto/producto-fav.dto';
import { ProductoFavEntity } from './producto-fav.entity';

@Controller('productos-fav')  
export class ProductosFavController {
  constructor(private readonly productosFavService: ProductosFavService) {}

  @Get()
  findAll(): Promise<ProductoFavEntity[]> {
    return this.productosFavService.findAll();
  }

  @Get(':userId')
  async getOne(@Param('userId', ParseIntPipe) userId: number) {
    return await this.productosFavService.findByUser(userId);
  }  

  @Post() 
  async create(@Body() createProductoFavDto: CreateProductoFavDto) {
    return await this.productosFavService.create(createProductoFavDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.productosFavService.remove(id);
  }
}
