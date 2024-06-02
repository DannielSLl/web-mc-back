import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PedidoEntity } from '../pedido/pedido.entity';
import { ProductEntity } from 'src/modules/products/product.entity';

@Entity('pedido_detalles')
export class PedidoDetalleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('number')
  cantidad: number;

  @ManyToOne(() => PedidoEntity, pedido => pedido.detalles)
  pedido: PedidoEntity;

  @ManyToOne(() => ProductEntity, producto => producto.detalles)
  producto: ProductEntity;
}
