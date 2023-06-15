import { BaseEntity } from "typeorm";
export declare class User extends BaseEntity {
    id: number;
    firstName: string;
    lastName: string;
    nickname: string;
    isActive: boolean;
}
