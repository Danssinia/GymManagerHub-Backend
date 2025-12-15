import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.entity";
import { Member } from "./Member.entity"


@Entity('staffs')
export class Staff {
    @PrimaryGeneratedColumn('uuid')
    staff_id!: string

    @Column({ type: 'uuid', unique: true })
    user_id!: string


    //relation between user and staff
    @OneToOne(() => User, user => user.staff, {
        onDelete: 'CASCADE'
    })

    @JoinColumn({ name: 'user_id' })
    user!: User

    @Column({ type: Date })
    hire_date!: Date

    @Column({ type: 'decimal' })
    salary!: number

    @Column({
        type: 'enum',
        enum: [
            'full-time',
            'part-time',
            'contract'
        ],
        default: 'full-time'
    })
    employment_status!: string

    @Column({ type: 'int', nullable: true })
    experience!: number


    //this is trainer specific field...i might add another additional fileds later
    @Column({ type: 'simple-array', nullable: true })
    specialization!: string

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    //relation between staff and member
    @OneToMany(() => Member, member => member.created_by_staff)
    members_created!: Member[];

    @OneToMany(() => Member, member => member.assigned_trainer)
    assigned_members!: Member[];

}