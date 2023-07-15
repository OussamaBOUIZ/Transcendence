import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import {Message} from "../message.entity";
import {User} from "../user.entity";

@Entity('User_chat')
export class User_chat extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.user_chat)
    user: User

    @Column()
    sender_id: number

    @OneToMany(() => Message, (messages) => messages.user_chat)
    messages: Message[]
}

