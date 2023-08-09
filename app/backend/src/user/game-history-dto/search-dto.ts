import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { throwIfEmpty } from "rxjs";

 function trim(value: string): string {
    return value.trim();
}

export class searchDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({value}) => trim(value))
    username: string 
}