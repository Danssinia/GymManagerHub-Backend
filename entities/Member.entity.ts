import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.entity";
import { Staff } from "./Staff.entity";
@Entity('members')
export class Member {
    @PrimaryGeneratedColumn('uuid')
    member_id!: string

    //foreign key to user
    @Column({ type: 'uuid', unique: true })
    user_id!: string

    @OneToOne(() => User, user => user.member, {
        onDelete: 'CASCADE',
        eager: true
    })
    @JoinColumn({ name: 'user_id' })
    user!: User

    //foreign key to staff (who created this member)
    @Column({ type: 'uuid', unique: true })
    created_by_staff_id!: string

    @ManyToOne(() => Staff, staff => staff.members_created, {
        onDelete: 'RESTRICT',
    })

    @JoinColumn({ name: 'created_by_staff_id' })
    created_by_staff!: Staff

    //assigned trainer
    @Column({ type: 'uuid', unique: true })
    assigned_trainer_id!: string

    @ManyToOne(() => Staff, staff => staff.assigned_members, {
        nullable: true,
        onDelete: 'SET NULL'
    })

    @JoinColumn({ name: 'assigned_trainer_id' })
    assigned_trainer!: Staff

    @Column({
        type: 'enum',
        enum: [
            'basic',
            'premium',
            'platinium'
        ],
        default: 'basic'
    })
    membership_plan!: string

    @Column({ type: 'date' })
    join_date!: Date

    @Column({ type: 'date' })
    membership_expiry!: Date

    @Column({
        type: 'enum',
        enum: [
            'pending',
            'paid',
            'cancelled'
        ],
        default: 'pending'
    })
    payment_status!: string

    @Column({ type: 'text', nullable: true })
    health_info!: string

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}