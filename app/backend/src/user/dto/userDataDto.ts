import {  IsNotEmpty, IsString} from 'class-validator';

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
    public firstname: string

    @IsNotEmpty()
    @IsString()
    public lastname: string

    @IsNotEmpty()
    @IsString()
    public username: string
}


export class statusDto {
    @IsString()
    @IsNotEmpty()
    status: string
}