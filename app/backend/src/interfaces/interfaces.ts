import { Transform, Type } from "class-transformer";
import {IsDate, IsNotEmpty, IsNotEmptyObject, IsNumber, IsString, Matches, NotContains} from "class-validator";


export class ReceiverDto {
	@IsNotEmpty()
	userName: string;
	@IsNotEmpty() 
	userId: number;
}

export function trim(value: string): string {
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
	socketId: string,
	username: string
}

export interface MessageData {
	authorId: number,
	username: string,
    message: string,
    creationTime: Date,
}

export interface gameData {
	userId: number,
	userName: string,
	userScore: number,
	opponentScore: number,
	opponentId: number,
	opponentUserName: string
}