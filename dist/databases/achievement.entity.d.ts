import { BaseEntity } from "typeorm";
import { User } from "./user.entity";
import { Stats } from "./stats.entity";
export declare class Achievement extends BaseEntity {
    id: number;
    user: User;
    stat: Stats;
    badge_icon: string;
    badge_name: string;
    description: string;
    is_achieved: boolean;
}
