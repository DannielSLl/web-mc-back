import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ProductosFavService } from './productos-fav.service';
import { CreateProductoFavDto } from '../productos-fav/dto/producto-fav.dto';
import { ProductoFavEntity } from './producto-fav.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('productos-fav')  
@Controller('productos-fav')
export class ProductosFavController {
  constructor(private readonly productosFavService: ProductosFavService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos favoritos' })
  @ApiResponse({ status: 200, description: 'Lista de productos favoritos', type: [ProductoFavEntity] })
  findAll(): Promise<ProductoFavEntity[]> {
    return this.productosFavService.findAll();
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Obtener productos favoritos por ID de usuario' })
  @ApiParam({ name: 'userId', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Productos favoritos del usuario', type: [ProductoFavEntity] })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async getOne(@Param('userId', ParseIntPipe) userId: number) {
    return await this.productosFavService.findByUser(userId);
  }  

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto favorito' })
  @ApiResponse({ status: 201, description: 'Producto favorito creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiBody({ type: CreateProductoFavDto })
  async create(@Body() createProductoFavDto: CreateProductoFavDto) {
    return await this.productosFavService.create(createProductoFavDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto favorito por ID' })
  @ApiParam({ name: 'id', description: 'ID del producto favorito' })
  @ApiResponse({ status: 200, description: 'Producto favorito eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Producto favorito no encontrado' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.productosFavService.remove(id);
  }
}
