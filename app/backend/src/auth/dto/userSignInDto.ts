
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword} from 'class-validator';

export class userSignInDto {

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    public email: string;

    @IsNotEmpty()
    public password: string;
}