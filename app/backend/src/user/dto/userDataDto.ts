import { Transform, Type } from 'class-transformer';
import {  IsNotEmpty, IsString} from 'class-validator';
import { trim } from 'src/interfaces/interfaces';

export class userDataDto {
    @IsString()
    public firstname: string

    @IsString()
    public lastname: string

    @IsString()
    public username: string
}

export class userNamesDto {
    @IsNotEmpty()
    @IsString()
	@Transform(({value}) => trim(value))
    public firstname: string

    @IsNotEmpty()
    @IsString()
    @Type(() => String)
	@Transform(({value}) => trim(value))
    public lastname: string

    @IsNotEmpty()
    @IsString()
    @Type(() => String)
	@Transform(({value}) => trim(value))
    public username: string
}


export class statusDto {
    @IsString()
    @IsNotEmpty()
    status: string
}