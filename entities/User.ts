import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IsEmail, Length } from "class-validator";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    @Length(3, 50)
    name!: string

    @Column({ unique: true })
    @IsEmail()
    email!: string

    @Column()

    password!: string

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}