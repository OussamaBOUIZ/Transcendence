import { BaseEntity } from "typeorm";
export declare class Chat extends BaseEntity {
    id: number;
    channel_name: string;
    channel_type: string;
}
