import { IsEmail, IsNotEmpty, IsString} from 'class-validator';
export class channelOwnerDto {
    @IsNotEmpty()
    @IsString()
    public channelName: string

    @IsString()
    @IsNotEmpty()
    public newChannelOwner: string
}