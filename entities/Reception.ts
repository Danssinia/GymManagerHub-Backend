import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Reception {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    phone!: number

    @Column()
    address!: string

    @Column()
    salary!: number

    @CreateDateColumn()
    createdAt!: Date
    @UpdateDateColumn()
    updatedAt!: Date

}