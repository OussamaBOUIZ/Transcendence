import { IsNotEmpty, IsString} from 'class-validator';

export class newUserDto {
    
    @IsNotEmpty()
    @IsString()
    public channelName: string

    @IsNotEmpty()
    @IsString()
    public channelType: string

    @IsNotEmpty()
    public channelNewUser: number
    
    @IsString()
    public providedPass: string
}
