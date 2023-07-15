
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword} from 'class-validator';

export class userSignInDto {

    @IsNotEmpty()
    @IsString()
    public username: string;

    @IsNotEmpty()
    @IsStrongPassword()
    public password: string;
}