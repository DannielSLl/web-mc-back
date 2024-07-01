import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { LocalEntity } from 'src/modules/local/local/local.entity';
import { PedidoDetalleEntity } from '../pedido-detalles/pedido-detalle.entity';
import { ClienteEntity } from 'src/modules/clientes/cliente.entity';
import { MetodoPagoEntity } from 'src/modules/metodo-pago/metodo-pago.entity';

@Entity('pedidos')
export class PedidoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  precioTotal: number;

  @Column()
  fecha: Date;

  @Column()
  fechaEntrega: Date;

  @Column()
  estado: boolean;

  //relaciones
  @ManyToOne(() => LocalEntity, local => local.pedidos)
  local: LocalEntity;

  @OneToMany(() => PedidoDetalleEntity, pedidoDetalle => pedidoDetalle.pedido)
  detalles: PedidoDetalleEntity[];

  @ManyToOne(() => ClienteEntity, clienteEntity => clienteEntity.pedidos)
  cliente: ClienteEntity;

  @ManyToOne(() => MetodoPagoEntity, metodoPagoEntity => metodoPagoEntity.pedidos)
  metodoPago: MetodoPagoEntity;
}
