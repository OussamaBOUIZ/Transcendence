import { IsArray, IsNotEmpty, IsNumber, IsString, Length} from 'class-validator';

export class channelDto {
    
    @IsNotEmpty()
    @IsString()
    public channelId: number

    @IsString()
    @Length(0, 12)
    public channelName: string

    @IsString()
    @IsNotEmpty()
    public channelType: string

    @IsString()
    @Length(0, 12)
    public channelPassword: string

    @IsNumber()
    public channelOwner: number
}