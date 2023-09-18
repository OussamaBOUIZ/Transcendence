import { BaseEntity } from "typeorm";
import { Achievement } from "./achievement/achievement.entity";
import { User } from "./user.entity";
export declare class Stats extends BaseEntity {
    id: number;
    achievements: Achievement[];
    wins: number;
    consecutive_wins: number;
    losses: number;
    user: User;
    xp: number;
    ladder_level: number;
    levelPercentage: number;
}
