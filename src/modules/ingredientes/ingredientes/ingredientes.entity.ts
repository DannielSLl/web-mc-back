import { LocalIngredienteEntity } from 'src/modules/local/local-ingrediente/local-ingrediente.entity';
import { IngredientesProductosEntity } from '../ingredienteProducto/ingredientes-productos.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ingredientes' })
export class IngredientesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  nombre: string;

  @Column({ type: 'varchar' })
  unidad: string;

  @OneToMany(
    () => IngredientesProductosEntity,
    (ingredientesProductosEntity) => ingredientesProductosEntity.ingrediente,
  )
  ingredientesProductosEntity: IngredientesProductosEntity[];

  @OneToMany(
    () => LocalIngredienteEntity,
    (localIngredienteEntity) => localIngredienteEntity.ingrediente,
  )
  localIngredienteEntity: LocalIngredienteEntity[];
}
