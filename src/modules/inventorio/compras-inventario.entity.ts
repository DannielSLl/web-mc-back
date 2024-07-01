import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { IngredientesEntity } from '../ingredientes/ingredientes/ingredientes.entity';

@Entity({ name: 'compras_inventario' })
export class ComprasInventorioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => IngredientesEntity)
  @JoinColumn({ name: 'ingrediente_id' })
  ingrediente: IngredientesEntity;

  @Column()
  ingrediente_id: number;

  @Column('decimal')
  cantidad: number;

  @Column('decimal')
  precio: number;
}
