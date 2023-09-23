import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class notifUpdateChannelNameDto {

    @IsNumber()
    @IsNotEmpty()
    public channelId: number;

    @IsString()
    @IsNotEmpty()
    public prevName: string
}