import { Type } from "class-transformer"
import { IsInt, IsPositive } from "class-validator"


export class StatsDto {
    @IsInt()
    @IsPositive()
    @Type(() => Number)
    wins: number

    @IsInt()
    @IsPositive()
    @Type(() => Number)
    losses: number

    @IsInt()
    @IsPositive()
    @Type(() => Number)
    ladder_level: number

    @IsInt()
    @IsPositive()
    @Type(() => Number)
    xp: number
}