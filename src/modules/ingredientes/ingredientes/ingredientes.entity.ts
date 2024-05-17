import { IngredientesProductosEntity } from '../ingredienteProducto/ingredientes-productos.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ingredientes' })
export class IngredientesEntity {
  @PrimaryGeneratedColumn()
  ingrediente_id: number;

  @Column({ type: 'varchar', unique: true })
  nombre: string;

  @Column({ type: 'varchar' })
  unidad: string;

  @OneToMany(
    () => IngredientesProductosEntity,
    (ingredientesProductosEntity) => ingredientesProductosEntity.ingrediente,
  )
  ingredientesProductosEntity: IngredientesProductosEntity[];
}
