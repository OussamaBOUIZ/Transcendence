
import { Transform, Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsString} from 'class-validator';
import { trim } from 'src/interfaces/interfaces';

export class channelMessageDto {
    
    @IsString()
	@IsNotEmpty()
	@Type(() => String)
	@Transform(({value}) => trim(value))
    message: string

    @IsString()
	@IsNotEmpty()
	@Type(() => String)
	@Transform(({value}) => trim(value))
    public channelName: string

    @IsNotEmpty()
    @IsNumber()
    public fromUser: number

    @IsNotEmpty()
    @IsString()
    public username: string

    @IsNotEmpty()
    @IsString()
    public image: string
}
