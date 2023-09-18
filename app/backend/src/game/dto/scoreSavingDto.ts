import {  IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class scoreStoreDto {
    @IsNotEmpty()
    @IsNumber()
    userScore: number

    @IsNotEmpty()
    @IsNumber()
    opponentScore: number

    @IsNotEmpty()
    @IsNumber()
    userId: number

    @IsNotEmpty()
    @IsNumber()
    opponentId: number
}
