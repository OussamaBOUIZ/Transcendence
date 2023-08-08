import { IsNotEmpty, IsString} from 'class-validator';

export class userDataDto {
    
    @IsNotEmpty()
    @IsString()
    public firstname: string

    @IsNotEmpty()
    @IsString()
    public lastname: string

    @IsString()
    public username: string
}
