import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { LocalEntity } from 'src/modules/local/local/local.entity';
import { PedidoDetalleEntity } from '../pedido-detalles/pedido-detalle.entity';

@Entity('pedidos')
export class PedidoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha: Date;

  @Column()
  estado: string;

  @ManyToOne(() => LocalEntity, local => local.pedidos)
  local: LocalEntity;

  @OneToMany(() => PedidoDetalleEntity, pedidoDetalle => pedidoDetalle.pedido)
  detalles: PedidoDetalleEntity[];
}
