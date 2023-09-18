import { BaseEntity } from "typeorm";
import { Message } from "./message.entity";
import { User } from "./user.entity";
export declare class User_chat extends BaseEntity {
    id: number;
    author: User;
    receiverId: number;
    messages: Message[];
}
