import { IsNumber } from "class-validator"


// Todo: handle if score is higher than what expected ?? 
export class GameHistoryDto {
    @IsNumber()
    userId: number

    @IsNumber()
    opponentId: number

    @IsNumber()
    user_score: number


    @IsNumber() 
    opponent_score: number
}
