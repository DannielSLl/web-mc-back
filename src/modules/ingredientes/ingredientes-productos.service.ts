import { ProductService } from './../products/products.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IngredientesProductosEntity } from './entity/ingredientes-productos.entity';
import { Repository } from 'typeorm';
import { IngredientesService } from './ingredientes.service';
import { IngredienteProductoDto } from './dto/ingrediente-producto.dto';
import { IngredientesEntity } from './entity/ingredientes.entity';

@Injectable()
export class IngredientesProductosService {
  constructor(
    @InjectRepository(IngredientesProductosEntity)
    private ingredientesProductoRepository: Repository<IngredientesProductosEntity>,
    private ProductService: ProductService,
    private ingredientesService: IngredientesService,
  ) {}

  async findIngredientesByProductId(id: number): Promise<IngredientesProductosEntity[]> {
    const ingredientesProductos = await this.ingredientesProductoRepository
        .createQueryBuilder('ip')
        .leftJoinAndSelect('ip.ingrediente', 'ingrediente')
        .where('ip.producto_id = :id', { id })
        .getMany();
      return ingredientesProductos;
  }

  async createNewRelation(
    idProducto: number,
    idIngrediente: number,
    cantidad: IngredienteProductoDto,
  ): Promise<any> {
    const product = await this.ProductService.findById(idProducto);
    const ingrediente = await this.ingredientesService.findById(idIngrediente);
    const newRelation = this.ingredientesProductoRepository.create({
      producto: product,
      ingrediente: ingrediente,
      cantidad: cantidad.cantidad,
      gramos: cantidad.gramos,
    });
    await this.ingredientesProductoRepository.save(newRelation);
    return {
      message: `Relación creada entre ${product.nombre} y ${ingrediente.nombre}`,
    };
  }
}
