import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "clientes"})
export class ClienteEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    name: string;

    @Column({type: 'varchar'})
    lastname: string;

    @Column({type: 'varchar'})
    email: string;

    @Column({type: 'float'})
    phone: number;

    @Column({type: 'varchar'})
    password: string;

    @Column({type: 'float'})
    puntos: number;
}