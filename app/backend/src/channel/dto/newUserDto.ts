import { IsNotEmpty, IsString} from 'class-validator';

export class newUserDto {
    
    @IsNotEmpty()
    @IsString()
    public channelName: string

    @IsNotEmpty()
    public channelNewUser: number
    
    @IsString()
    public providedPass: string
}
