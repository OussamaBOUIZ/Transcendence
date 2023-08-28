import { IsNotEmpty, IsString} from 'class-validator';

export class protectedChannelDto {
    @IsNotEmpty()
    @IsString()
    public channelName: string


    @IsNotEmpty()
    @IsString()
    public channelPassword: string
}