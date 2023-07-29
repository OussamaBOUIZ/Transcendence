import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class muteUserDto {

    @IsNumber()
    @IsNotEmpty()
    public userId: number;

    @IsNotEmpty()
    @IsString()
    public channelName: string

    @IsNotEmpty()
    @IsNumber()
    public minutes: number
}