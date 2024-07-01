import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LocalEntity } from "../local/local/local.entity";

@Entity({name: 'empleados'})
export class EmployeesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', nullable: false})
    name: string;

    @Column({type: 'varchar', nullable: false})
    lastname: string;

    @Column({type: 'varchar', nullable: false, unique: true})
    email: string;

    @Column({type: 'varchar', nullable: false})
    password: string;

    @Column({type: 'varchar', nullable: false})
    role: string;

    @ManyToOne(() => LocalEntity, local => local.empleados)
    local: LocalEntity;
}