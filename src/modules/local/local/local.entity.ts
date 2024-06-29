import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LocalIngredienteEntity } from '../local-ingrediente/local-ingrediente.entity';
import { LocalProductoEntity } from '../local-producto/local-producto.entity';
import { PedidoEntity } from 'src/modules/pedidos/pedido/pedido.entity';

@Entity('locales')
export class LocalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  nombre: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  ciudad: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  direccion: string;

  @OneToMany(
    () => LocalIngredienteEntity,
    (localIngredienteEntity) => localIngredienteEntity.local,
  )
  localIngredienteEntity: LocalIngredienteEntity[];

  @OneToMany(
    () => LocalProductoEntity,
    (localProductoEntity) => localProductoEntity.producto,
  )
  localProductoEntity: LocalProductoEntity[];

  @OneToMany(() => PedidoEntity, (pedido) => pedido.local
  )
  pedidos: PedidoEntity[];
}
