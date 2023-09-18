export declare class ReceiverDto {
    userName: string;
    userId: number;
}
export declare function trim(value: string): string;
export declare class MessageDto {
    receiverId: number;
    message: string;
    creationTime: Date;
}
export interface sentMsg {
    authorId: number;
    socketId: string;
    username: string;
}
export interface MessageData {
    authorId: number;
    username: string;
    message: string;
    creationTime: Date;
}
