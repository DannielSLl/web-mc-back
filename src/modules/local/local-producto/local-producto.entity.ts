import { ProductEntity } from 'src/modules/products/product.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Entity,
} from 'typeorm';
import { LocalEntity } from '../local/local.entity';

@Entity('local_producto')
export class LocalProductoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  cantidad: number;

  @ManyToOne(
    () => ProductEntity,
    (producto) => producto.localProductEntity,
  )
  @JoinColumn({ name: 'producto_id' })
  producto: ProductEntity;

  @ManyToOne(() => LocalEntity, (local) => local.localProductEntity)
  @JoinColumn({ name: 'local_id' })
  local: LocalEntity;
}
