import { BaseEntity } from "typeorm";
import { Muted_users } from "./muted_users.entity";
export declare class Channel extends BaseEntity {
    id: number;
    channel_name: string;
    channel_type: string;
    channel_password: string;
    channel_owners: number[];
    channel_users: number[];
    banned_users: number[];
    muted: Muted_users[];
    direct_messages: string;
    access_profiles: string;
}
