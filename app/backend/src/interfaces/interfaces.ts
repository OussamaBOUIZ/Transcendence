import { Transform } from "class-transformer";
import {IsDate, IsNotEmpty, IsNotEmptyObject, IsNumber, IsString} from "class-validator";


export class ReceiverDto {
	@IsNotEmpty()
	userName: string;
	@IsNotEmpty()
	userId: number;
}

// export class MessageDto {
// 	user: {
// 		userId: string;
// 		userName: string;
// 	};
// 	timeSent: string;
// 	message: string;
// }

export class  MessageDto {
	@IsNumber()
	userId: number
	@IsString()
    message: string
	@IsDate()
    creationTime: Date
}
