import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoriaEntity } from '../categoria/categoria.entity';
import { IngredientesProductosEntity } from '../ingredientes/ingredienteProducto/ingredientes-productos.entity';
import { LocalProductoEntity } from '../local/local-producto/local-producto.entity';
import { PedidoDetalleEntity } from '../pedidos/pedido-detalles/pedido-detalle.entity';
import { ProductoFavEntity } from '../productos-fav/producto-fav.entity';

@Entity({ name: 'productos' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'int' })
  precio: number;

  @Column({ type: 'int' })
  calorias: number;

  @Column({ type: 'varchar' })
  img: string;

  @ManyToOne(() => CategoriaEntity, (categoria) => categoria.productEntity,
    { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'categoriaId' })
  categoria: CategoriaEntity;

  @OneToMany(
    () => IngredientesProductosEntity,
    (ingredientesProductosEntity) => ingredientesProductosEntity.producto,
  )
  ingredientesProductosEntity: IngredientesProductosEntity[];

  @OneToMany(
    () => LocalProductoEntity,
    (localProductoEntity) => localProductoEntity.producto,
  )
  localProductoEntity: LocalProductoEntity[];

  @OneToMany(
    () => PedidoDetalleEntity,
    (pedidoDetalle) => pedidoDetalle.producto
  )
  detalles: PedidoDetalleEntity[];

  @OneToMany(() => ProductoFavEntity, productoFav => productoFav.producto,
    { onDelete: 'CASCADE' })
  productosFav: ProductoFavEntity[];
}
