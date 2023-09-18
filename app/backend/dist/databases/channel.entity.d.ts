import { BaseEntity } from "typeorm";
import { Muted_users } from "./muted_users.entity";
import { Message } from "./message.entity";
import { User } from "./user.entity";
export declare class Channel extends BaseEntity {
    id: number;
    channel_name: string;
    channel_type: string;
    channel_password: string;
    channelUsers: User[];
    channelAdmins: User[];
    channelOwners: User[];
    BannedUsers: User[];
    messages: Message[];
    muted: Muted_users[];
}
