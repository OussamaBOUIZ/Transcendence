import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class gameRoomDto {

    @IsNumber()
    @IsNotEmpty()
    public hostId: number;

    @IsNumber()
    @IsNotEmpty()
    public key: number

    @IsString()
    @IsNotEmpty()
    public gameName: string
}