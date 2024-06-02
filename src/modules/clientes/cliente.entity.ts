import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PedidoEntity } from "../pedidos/pedido/pedido.entity";

@Entity({name: "clientes"})
export class ClienteEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    name: string;

    @Column({type: 'varchar'})
    lastname: string;

    @Column({type: 'varchar', unique: true})
    email: string;

    @Column({type: 'number'})
    phone: number;

    @Column({type: 'varchar'})
    password: string;

    @Column({type: 'number'})
    puntos: number;

    @OneToMany(() => PedidoEntity, pedidoEntity => pedidoEntity.local)4
    pedidos: PedidoEntity[];
}