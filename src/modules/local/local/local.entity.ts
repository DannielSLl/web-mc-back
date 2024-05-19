import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LocalIngredienteEntity } from '../local-ingrediente/local-ingrediente.entity';

@Entity('locales')
export class LocalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  nombre: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  ciudad: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  direccion: string;

  @OneToMany(
    () => LocalIngredienteEntity,
    (localIngredienteEntity) => localIngredienteEntity.local,
  )
  localIngredienteEntity: LocalIngredienteEntity[];
}
