import {IsNotEmpty, IsNotEmptyObject} from "class-validator";


export class ReceiverDto {
	@IsNotEmpty()
	userName: string;
	@IsNotEmpty()
	userId: number;
}

export class MessageDto {
	user: {
		userId: string;
		userName: string;
	};
	timeSent: string;
	message: string;
}