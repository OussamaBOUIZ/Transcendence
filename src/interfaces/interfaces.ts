import {IsNotEmpty, IsNotEmptyObject} from "class-validator";


class Rec {
	@IsNotEmpty()
	userName: string;
	@IsNotEmpty()
	userId: number;
}
export class MessageDto {
	@IsNotEmptyObject()
	user: Rec;
	@IsNotEmpty()
	timeSent: string;
	@IsNotEmpty()
	message: string;
}
