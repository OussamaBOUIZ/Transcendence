import { IsArray, IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class channelDto {
    
    @IsNotEmpty()
    @IsString()
    public channelName: string

    @IsNotEmpty()
    @IsString()
    public channelType: string

    @IsString()
    public channelPassword: string

    @IsArray()
    @IsNumber({}, { each: true })
    public joinedUsers: number[];

    @IsNumber()
    @IsNotEmpty()
    public channelOwner: number
}