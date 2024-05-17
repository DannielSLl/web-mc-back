import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CategoriaEntity } from '../categoria/categoria.entity';
import { IngredientesProductosEntity } from '../ingredientes/ingredienteProducto/ingredientes-productos.entity';

@Entity({ name: 'productos' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  producto_id: number;

  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'float' })
  precio: number;

  @Column({ type: 'float' })
  calorias: number;

  @Column({ type: 'varchar' })
  img: string;

  @ManyToOne(() => CategoriaEntity, (categoria) => categoria.productEntity)
  @JoinColumn({ name: 'categoria_id' })
  categoria: CategoriaEntity;

  @OneToMany(() => IngredientesProductosEntity, ingredientesProductosEntity => ingredientesProductosEntity.producto)
  ingredientesProductosEntity: IngredientesProductosEntity[];
}
