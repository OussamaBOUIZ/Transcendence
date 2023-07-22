
import { IsEmail, IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class channelMessageDto {
    
    @IsNotEmpty()
    @IsString()
    public message: string

    @IsNotEmpty()
    @IsString()
    public channelName: string

    @IsNotEmpty()
    @IsNumber()
    public fromUser: number
}
