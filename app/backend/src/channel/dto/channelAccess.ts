import { IsArray, IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class channelAccess {
    
    @IsNotEmpty()
    @IsString()
    public prevChannel: string

    @IsNotEmpty()
    @IsString()
    public channelName: string

    @IsNumber()
    @IsNotEmpty()
    public userId: number
}