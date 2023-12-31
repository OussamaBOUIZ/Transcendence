
import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";

@Entity('Inbox_user')
export class Inbox_user extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @ManyToOne(() => User, (user) => user.inbox_users)
    author: User

    @Column()
    lastMessage: string

    @Column()
    CreatedAt: Date

    @Column({default: 0})
    unseenMessages: number

    @ManyToOne(() => User, (user) => user.inbox_users)
    user: User
}


/*
    const inboxes = await this.InboxRepo.find({
        where: {userId: 3}
    })
*/