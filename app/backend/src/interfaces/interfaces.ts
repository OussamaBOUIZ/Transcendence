import { Transform, Type } from "class-transformer";
import {IsDate, IsNotEmpty, IsNotEmptyObject, IsNumber, IsString, Matches} from "class-validator";

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
	@Matches(/^\S*$/, {
		message: 'Username cannot contain whitespaces',
	  })
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