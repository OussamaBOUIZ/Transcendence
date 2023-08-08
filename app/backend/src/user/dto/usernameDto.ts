import { IsNotEmpty, IsString} from 'class-validator';

export class usernameDto {
    
    @IsNotEmpty()
    @IsString()
    public username: string
}
