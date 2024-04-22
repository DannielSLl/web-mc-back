import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "productos"})
export class ProductEntity {

    @PrimaryGeneratedColumn()
    producto_id: number;

    @Column({type: 'varchar'})
    nombre: string;

    @Column({type: 'varchar'})
    description: string;

    @Column({type: 'float'})
    precio: number;

    @Column({type: 'float'})
    calorias: number;

    @Column({type: 'varchar'})
    categoria: string;

    @Column({type: 'varchar'})
    img: string;
}