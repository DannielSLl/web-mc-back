import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Entity,
} from 'typeorm';
import { LocalEntity } from '../local/local.entity';
import { IngredientesEntity } from 'src/modules/ingredientes/ingredientes/ingredientes.entity';

@Entity('local_ingrediente')
export class LocalIngredienteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  cantidad: number;

  @ManyToOne(
    () => IngredientesEntity,
    (ingredientes) => ingredientes.localIngredienteEntity
  )
  @JoinColumn({ name: 'ingrediente_id' })
  ingrediente: IngredientesEntity;

  @ManyToOne(() => LocalEntity, (local) => local.localProductEntity)
  @JoinColumn({ name: 'local_id' })
  local: LocalEntity;
}
