import { BaseEntity } from "typeorm";
export declare class Game extends BaseEntity {
    id: number;
    user1: number;
    user2: number;
    userShots: number;
    opponentShots: number;
    CreatedAt: Date;
}
