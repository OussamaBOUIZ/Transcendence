import { IsEmail, IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class userWinDto {
    
    @IsNotEmpty()
    @IsNumber()
    userId: number

    @IsNotEmpty()
    @IsNumber()
    wonXp: number
}
