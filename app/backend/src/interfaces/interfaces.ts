import {IsNotEmpty, IsNotEmptyObject} from "class-validator";


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
	timeSent: string;
	message: string;
}
