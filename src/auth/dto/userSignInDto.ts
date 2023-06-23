
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword} from 'class-validator';

export class userSignInDto {

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    public email: string;

    @IsNotEmpty()
    @IsStrongPassword()
    public password: string;
}