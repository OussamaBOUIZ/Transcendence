import { IsNotEmpty, IsString, isNumber} from 'class-validator';

export class newUserDto {
    
    @IsNotEmpty()
    @IsString()
    public channelName: string

    @IsNotEmpty()
    public channelNewUser: number
    
    @IsNotEmpty()
    @IsString()
    public providedPass: string
}
