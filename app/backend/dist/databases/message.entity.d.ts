import { BaseEntity } from "typeorm";
import { User_chat } from "./userchat.entity";
import { Channel } from "./channel.entity";
export declare class Message extends BaseEntity {
    id: number;
    user_chat: User_chat;
    channel: Channel;
    fromUser: number;
    message: string;
    CreatedAt: Date;
}
