import { BaseEntity } from "typeorm";
import { Channel } from "./channel.entity";
export declare class Muted_users extends BaseEntity {
    id: number;
    user_id: number;
    channel: Channel;
}
