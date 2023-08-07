import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { throwIfEmpty } from "rxjs";

export class searchDto {
    @IsString()
    @IsNotEmpty()
    // (({ value }) => value.trim())
    username: string 
}