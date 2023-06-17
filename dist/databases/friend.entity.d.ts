import { BaseEntity } from "typeorm";
export declare class Friend extends BaseEntity {
    id: number;
    user_id: number;
    status: string;
}
