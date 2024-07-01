import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { ClienteEntity } from '../clientes/cliente.entity';
import { ProductEntity } from '../products/product.entity';

@Entity()
export class ProductoFavEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ClienteEntity, (cliente) => cliente.productosFav, {
    onDelete: 'CASCADE',
  })
  cliente: ClienteEntity;

  @ManyToOne(() => ProductEntity, (product) => product.productosFav,
    { onDelete: 'CASCADE' })
  producto: ProductEntity;
}
