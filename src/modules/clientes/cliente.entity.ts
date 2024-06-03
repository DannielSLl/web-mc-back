import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PedidoEntity } from '../pedidos/pedido/pedido.entity';
import { ProductoFavEntity } from '../productos-fav/producto-fav.entity';

@Entity({name: 'clientes'})
export class ClienteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'varchar'})
  lastname: string;

  @Column({type: 'varchar', unique: true})
  email: string;

  @Column({type: 'int'})
  phone: number;

  @Column({type: 'varchar'})
  password: string;

  @Column({type: 'int'})
  puntos: number;

  @OneToMany(() => PedidoEntity, pedidoEntity => pedidoEntity.local)
  pedidos: PedidoEntity[];

  @OneToMany(() => ProductoFavEntity, productoFav => productoFav.cliente)
  productosFav: ProductoFavEntity[];
}
