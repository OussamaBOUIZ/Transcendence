import { BaseEntity } from "typeorm";
import { User } from "./user.entity";
export declare class Game extends BaseEntity {
    id: number;
    user1: User;
    user2: User;
    userShots: number;
    opponentShots: number;
}
