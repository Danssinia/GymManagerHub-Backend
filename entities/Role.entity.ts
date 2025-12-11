import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.entity";

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn('uuid')
    role_id!: string

    @Column({ unique: true, length: 50 })
    role_name!: string

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    //again the relation,,,i might update it

    @OneToMany(() => User, user => user.role)
    users!: User[]
}
