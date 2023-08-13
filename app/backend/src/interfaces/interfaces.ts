import { Transform } from "class-transformer";
import {IsNotEmpty} from "class-validator";


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

export class MessageDto {
	user: {
		userName: string;
		userId: number;
	};
	@Transform(({ value }) => new Date(value))
	timeSent: Date;
	message: string;
}
