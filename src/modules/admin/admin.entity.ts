import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "admin"})
export class AdminEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    name: string;

    @Column({type: 'varchar'})
    lastname: string;

    @Column({type: 'varchar', unique: true})
    email: string;

    @Column({type: 'varchar'})
    password: string;

    @Column({type: 'boolean'})
    activo: boolean;
}