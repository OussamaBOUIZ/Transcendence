import { Transform } from "class-transformer";
import {IsDate, IsNotEmpty, IsNotEmptyObject, IsNumber, IsString} from "class-validator";

export class ReceiverDto {
	@IsNotEmpty()
	userName: string;
	@IsNotEmpty()
	userId: number;
}


export class  MessageDto {
	@IsNumber()
	receiverId: number

	@IsString()
	@IsNotEmpty()
    message: string
	
	@IsDate()
    creationTime: Date
}

export interface sentMsg {
	authorId: number,
	socketId: string
}

export interface MessageData {
	authorId: number,
    message: string,
    creationTime: Date,
}