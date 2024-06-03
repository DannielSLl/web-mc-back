import { ProductEntity } from 'src/modules/products/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IngredientesEntity } from '../ingredientes/ingredientes.entity';

@Entity({ name: 'ingredientes_productos' })
export class IngredientesProductosEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gramos: number;

  @Column()
  cantidad: number;

  @ManyToOne(
    () => ProductEntity,
    (producto) => producto.ingredientesProductosEntity,
  )
  @JoinColumn({ name: 'producto_id' })
  producto: ProductEntity;

  @ManyToOne(
    () => IngredientesEntity,
    (ingredientes) => ingredientes.ingredientesProductosEntity,
  )
  @JoinColumn({ name: 'ingrediente_id' })
  ingrediente: IngredientesEntity;
}
