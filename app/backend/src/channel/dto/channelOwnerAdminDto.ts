import { IsEmail, IsNotEmpty, IsString} from 'class-validator';
export class channelOwnerDto {
    @IsNotEmpty()
    @IsString()
    public channelName: string

    @IsNotEmpty()
    public newChannelOwner: number
}

export class channelAdminDto {
    @IsNotEmpty()
    @IsString()
    public channelName: string

    @IsNotEmpty()
    public newChannelAdmin: number
}