import { IsNotEmpty, IsString} from 'class-validator';

export class userDataDto {
    @IsString()
    public firstname: string

    @IsString()
    public lastname: string

    @IsString()
    public username: string
}