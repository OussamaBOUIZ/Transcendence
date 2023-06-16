import { BaseEntity } from "typeorm";
import { Achievement } from "./achievement.entity";
export declare class Stats extends BaseEntity {
    id: number;
    achievements: Achievement[];
    wins: number;
    losses: number;
    ladder_level: number;
}
