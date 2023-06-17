import { BaseEntity } from "typeorm";
import { Stats } from "./stats.entity";
import { Match_history } from "./match_history.entity";
import { Friend } from "./friend.entity";
import { Channel } from "./channel.entity";
export declare class User extends BaseEntity {
    id: number;
    unique_name: string;
    avatar: string;
    is_two_factor: boolean;
    friends: Friend[];
    blocked_users: number[];
    joined_channels: Channel[];
    stat: Stats;
    match_history: Match_history[];
}
