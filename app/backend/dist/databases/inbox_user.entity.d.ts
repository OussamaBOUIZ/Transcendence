import { BaseEntity } from "typeorm";
import { User } from "./user.entity";
export declare class Inbox_user extends BaseEntity {
    id: number;
    author: User;
    lastMessage: string;
    CreatedAt: Date;
    unseenMessages: number;
    user: User;
}
