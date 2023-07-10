import { IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class channelDto {
    
    @IsNotEmpty()
    @IsString()
    public channelName: string

    @IsNotEmpty()
    @IsString()
    public channelType: string

    @IsString()
    public channelPassword: string

    @IsString()
    @IsNotEmpty()
    public channelOwner: string
}
