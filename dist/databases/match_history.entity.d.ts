import { BaseEntity } from "typeorm";
import { User } from "./user.entity";
export declare class Match_history extends BaseEntity {
    id: number;
    user: User;
    opponent: User;
    user_score: number;
    opponent_score: number;
}
