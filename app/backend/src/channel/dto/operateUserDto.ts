import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserOperationDto {

    @IsNumber()
    @IsNotEmpty()
    public userId: number;

    

    @IsNotEmpty()
    @IsString()
    public channelName: string
}