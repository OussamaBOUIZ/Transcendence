import { Transform, Type } from "class-transformer";
import {IsDate, IsNotEmpty, IsNotEmptyObject, IsNumber, IsString, Matches, NotContains} from "class-validator";


export class ReceiverDto {
	@IsNotEmpty()
	userName: string;
	@IsNotEmpty() 
	userId: number;
}

function trim(value: string): string {
    return value.trim();
}

export class  MessageDto {
	@IsNumber()
	receiverId: number

	
	@IsString()
	@IsNotEmpty()
	@Type(() => String)
	@Transform(({value}) => trim(value))
    message: string
	
	@Type(() => Date)
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