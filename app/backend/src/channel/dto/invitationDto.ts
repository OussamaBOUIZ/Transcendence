import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class invitationDto {

    @IsNumber()
    @IsNotEmpty()
    public userId: number;

    @IsNumber()
    @IsNotEmpty()
    public guestId: number

    @IsString()
    @IsNotEmpty()
    public gameName: string
}