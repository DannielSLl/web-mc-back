import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { LocalEntity } from 'src/modules/local/local/local.entity';
import { PedidoDetalleEntity } from '../pedido-detalles/pedido-detalle.entity';
import { ClienteEntity } from 'src/modules/clientes/cliente.entity';

@Entity('pedidos')
export class PedidoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('number')
  precioTotal: number;

  @Column()
  fecha: Date;

  @Column()
  fechaEntrega: Date;

  @Column()
  estado: boolean;

  @Column()
  metodoPago: string;

  //relaciones
  @ManyToOne(() => LocalEntity, local => local.pedidos)
  local: LocalEntity;

  @OneToMany(() => PedidoDetalleEntity, pedidoDetalle => pedidoDetalle.pedido)
  detalles: PedidoDetalleEntity[];

  @ManyToOne(() => ClienteEntity, clienteEntity => clienteEntity.pedidos)
  cliente: ClienteEntity;
}
