import { BaseEntity } from "typeorm";
export declare class Friend extends BaseEntity {
    id: number;
    friend_id: number;
    status: string;
    friend_wins: number;
}
