import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User_chat} from "./userchat/userchat.entity";

@Entity('Message')
export class Message extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User_chat, (user_chat) => user_chat.messages)
    user_chat: User_chat

    @Column()
    message: string

    @Column({type: "timestamp"})
    CreatedAt: Date
}

