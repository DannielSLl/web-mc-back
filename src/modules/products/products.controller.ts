import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductDto } from './dto/product.dto';

@Controller('products')
export class ProductsController {
    constructor(readonly productoService: ProductService){}

    @Get()
    async getAll(){
        return await this.productoService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe)id: number){
        return await this.productoService.findById(id);
    }

    @Post()
    async create(@Body()dto: ProductDto){
        return await this.productoService.create(dto);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe)id: number, @Body()dto: ProductDto){
        return await this.productoService.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe)id: number){
        return await this.productoService.delete(id);
    }
}
