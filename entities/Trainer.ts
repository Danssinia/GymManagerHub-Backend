import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsEmail, Length } from "class-validator";
@Entity()
export class Trainer {
    @PrimaryGeneratedColumn()
    id!:number

    @Column()
    specialization!: string

    @Column()
    experience!:string

    @Column()
    phone!:number

    @Column()
    address!:string

    @Column()
    salary!:number

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}