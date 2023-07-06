import {IsNotEmpty, IsNotEmptyObject} from "class-validator";


export class ReceiverDto {
	@IsNotEmpty()
	userName: string;
	@IsNotEmpty()
	userId: number;
}

export class MessageDto {
	@IsNotEmptyObject()
	user: ReceiverDto;
	@IsNotEmpty()
	timeSent: string;
	@IsNotEmpty()
	message: string;
}
