import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger'; 

@ApiTags('productos')
@Controller('products')
export class ProductsController {
  constructor(readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({ status: 200, description: 'Productos encontrados.', type: ProductDto, isArray: true })
  async getAll() {
    return await this.productService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por su ID' }) // Descripción del endpoint
  @ApiParam({ name: 'id', type: 'number', description: 'ID del producto' }) // Descripción del parámetro
  @ApiResponse({ status: 200, description: 'Producto encontrado.', type: ProductDto }) // Descripción de la respuesta
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.findById(id);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto' }) 
  @ApiBody({ type: ProductDto }) 
  @ApiResponse({ status: 201, description: 'Producto creado correctamente.', type: ProductDto }) 
  async create(@Body() dto: ProductDto) {
    return await this.productService.create(dto);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un producto existente por su ID' }) 
  @ApiParam({ name: 'id', type: 'number', description: 'ID del producto' }) 
  @ApiBody({ type: ProductDto }) 
  @ApiResponse({ status: 200, description: 'Producto actualizado correctamente.', type: ProductDto }) 
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: ProductDto) {
    return await this.productService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto por su ID' }) 
  @ApiParam({ name: 'id', type: 'number', description: 'ID del producto' }) 
  @ApiResponse({ status: 200, description: 'Producto eliminado correctamente.' }) 
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.delete(id);
  }
}
