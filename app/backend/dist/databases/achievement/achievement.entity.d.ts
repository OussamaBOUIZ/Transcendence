import { BaseEntity } from "typeorm";
import { Stats } from "../stats.entity";
export declare class Achievement extends BaseEntity {
    id: number;
    stat: Stats;
    badge_name: string;
    description: string;
    is_achieved: boolean;
    user_id: number;
}
