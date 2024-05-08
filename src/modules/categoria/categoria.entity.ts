import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'categorias' })
export class CategoriaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  nombre: string;

  @Column('varchar')
  url: string;
}
