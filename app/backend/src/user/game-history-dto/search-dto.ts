import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

 function trim(value: string): string {
    return value.trim();
}

export class searchDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({value}) => trim(value))
    username: string 
}
