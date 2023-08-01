import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";

@Entity('Inbox_user')
export class Inbox_user extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    sender_id: number

    @Column()
    lastMessage: string

    @Column()
    CreatedAt: Date

    @Column({default: 0})
    unseenMessages: number

    @ManyToOne(() => User, (user) => user.inbox_users)
    user: User
}

