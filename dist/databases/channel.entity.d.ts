import { BaseEntity } from "typeorm";
export declare class Channel extends BaseEntity {
    id: number;
    channel_name: string;
    channel_type: string;
    channel_password: string;
    channel_owners: number[];
    channel_users: number[];
    banned_users: number[];
    direct_messages: string;
    access_profiles: string;
}
