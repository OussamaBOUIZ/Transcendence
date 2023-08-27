import { IsArray, IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class channelDto {
    
    @IsNotEmpty()
    @IsString()
    public prevChannelName: string

    @IsNotEmpty()
    @IsString()
    public channelName: string

    @IsNotEmpty()
    @IsString()
    public channelType: string

    @IsString()
    public channelPassword: string

    @IsNumber()
    @IsNotEmpty()
    public channelOwner: number
}