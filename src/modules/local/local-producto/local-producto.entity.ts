import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Entity,
} from 'typeorm';
import { LocalEntity } from '../local/local.entity';
import { ProductEntity } from 'src/modules/products/product.entity';

@Entity('local_producto')
export class LocalProductoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  cantidad: number;

  @ManyToOne(
    () => ProductEntity,
    (producto) => producto.localProductoEntity,
  )
  @JoinColumn({ name: 'producto_id' })
  producto: ProductEntity;

  @ManyToOne(() => LocalEntity, (local) => local.localProductoEntity)
  @JoinColumn({ name: 'local_id' })
  local: LocalEntity;
}
