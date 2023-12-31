import {  IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class userWinDto {
    @IsNotEmpty()
    @IsNumber()
    userId: number

    @IsNotEmpty()
    @IsNumber()
    wonXp: number

    @IsNotEmpty()
    @IsString()
    gameName: string

    @IsNotEmpty()
    @IsNumber()
    opponentLevel: number

    @IsNotEmpty()
    @IsNumber()
    opponentId: number
}
