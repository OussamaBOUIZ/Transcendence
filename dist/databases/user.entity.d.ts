import { BaseEntity } from "typeorm";
import { Stats } from "./stats.entity";
import { Match_history } from "./match_history.entity";
export declare class User extends BaseEntity {
    id: number;
    unique_name: string;
    avatar: string;
    is_two_factor: boolean;
    friends: User[];
    friends_status: string[];
    stat: Stats;
    match_history: Match_history[];
}
