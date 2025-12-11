import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "./Role.entity"
import { Staff } from "./Staff.entity"
import { Member } from "./Member.entity"
@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    user_id!: string

    @Column({ length: 100 })
    first_name!: string

    @Column({ length: 100 })
    last_name!: string

    @Column({ unique: true, length: 255 })
    email!: string

    @Column({ unique: true, length: 100 })
    username!: string

    @Column({ length: 255 })
    password!: string

    @Column({ length: 20, nullable: true })
    phone!: string

    @Column({ type: Date, nullable: true })
    date_of_birth!: Date

    @Column({ type: 'text', nullable: true })
    address!: string

    @Column({ length: 500, nullable: true })
    profile_picture!: string

    @Column({ type: 'uuid' })
    role_id!: string


    //i might change the relation later but here are the relations

    //relation between User and Role
    @ManyToOne(() => Role, role => role.users, {
        eager: true,
        onDelete: 'RESTRICT'
    })

    @JoinColumn({ name: 'role_id' })
    role!: Role

    @Column({ default: true })
    is_active!: boolean

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    //Relation between User and Staff
    @OneToOne(() => Staff, staff => staff.user , { nullable: true })
    staff!: Staff

    //Relation between User and Member
    // @OneToOne(() => Member, member => member.user, { nullable: true })
    // member!: Member

}