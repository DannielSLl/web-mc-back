import { ProductService } from '../../products/products.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IngredientesProductosEntity } from './ingredientes-productos.entity';
import { Repository } from 'typeorm';
import { IngredientesService } from '../ingredientes/ingredientes.service';
import { IngredienteProductoDto } from './dto/ingrediente-producto.dto';

@Injectable()
export class IngredientesProductosService {
  constructor(
    @InjectRepository(IngredientesProductosEntity)
    private ingredientesProductoRepository: Repository<IngredientesProductosEntity>,
    private ProductService: ProductService,
    private ingredientesService: IngredientesService,
  ) {}

  async findIngredientesByProductId(
    id: number,
  ): Promise<IngredientesProductosEntity[]> {
    const ingredientesProductos = await this.ingredientesProductoRepository
      .createQueryBuilder('ip')
      .leftJoinAndSelect('ip.ingrediente', 'ingrediente')
      .where('ip.producto_id = :id', { id })
      .getMany();
    return ingredientesProductos;
  }

  async createNewRelation(dto: IngredienteProductoDto
  ): Promise<any> {
    const product = await this.ProductService.findById(dto.producto_id);
    const ingrediente = await this.ingredientesService.findById(dto.ingrediente_id);
    const newRelation = this.ingredientesProductoRepository.create({
      producto: product,
      ingrediente: ingrediente,
      cantidad: dto.cantidad,
      gramos: dto.gramos,
    });
    await this.ingredientesProductoRepository.save(newRelation);
    return {
      message: `Relación creada entre ${product.nombre} y ${ingrediente.nombre}`,
    };
  }
}
