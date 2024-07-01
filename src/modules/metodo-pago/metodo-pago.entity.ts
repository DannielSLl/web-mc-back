import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PedidoEntity } from 'src/modules/pedidos/pedido/pedido.entity';

@Entity('metodo_pago')
export class MetodoPagoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' }) 
  numeroTarjeta: number;

  @Column({ type: 'timestamp' }) 
  fechaExpiracion: Date;

  @Column({ type: 'varchar', length: 50 })
  tipoTarjeta: string; 

  @OneToMany(() => PedidoEntity, pedido => pedido.metodoPago)
  pedidos: PedidoEntity[];
}
