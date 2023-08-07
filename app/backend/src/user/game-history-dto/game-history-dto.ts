import { IsNumber } from "class-validator"
import { LessThan } from "typeorm"


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
