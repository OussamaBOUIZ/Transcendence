import {BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User_chat} from "./userchat.entity";
import { Channel } from "./channel.entity";

@Entity('Message')
export class Message extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @ManyToOne(() => User_chat, (user_chat) => user_chat.messages, {nullable: true})
    user_chat: User_chat

    @ManyToOne(() => Channel, (channel) => channel.messages, {nullable: true})
    channel: Channel

    @Column()
    fromUser: number
    
    @Column({nullable: true})
    message: string

    @CreateDateColumn()
    CreatedAt: Date
}

