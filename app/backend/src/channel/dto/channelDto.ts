import { Transform, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsString, Length} from 'class-validator';
import { trim } from 'src/interfaces/interfaces';

export class channelDto {

    @IsNumber()
    public channelId: number

    @IsString()
	@Type(() => String)
	@Transform(({value}) => trim(value))
    @Length(0, 12)
    public channelName: string

    @IsString()
    @IsNotEmpty()
    public channelType: string

    @IsString()
    @Length(0, 12)
    public channelPassword: string

    @IsNumber()
    public channelOwner?: number
}