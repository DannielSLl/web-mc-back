import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CategoriaEntity } from '../categoria/categoria.entity';

@Entity({ name: 'productos' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  producto_id: number;

  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'float' })
  precio: number;

  @Column({ type: 'float' })
  calorias: number;

  @Column({ type: 'float' })
  categoria: number;

  @Column({ type: 'varchar' })
  img: string;
}
