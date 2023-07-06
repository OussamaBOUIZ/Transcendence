
import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword} from 'class-validator';

export class userSignUpDto {

    @IsNotEmpty()
    @IsString()
    public firstname: string;
    
    @IsNotEmpty()
    @IsString()
    public lastname: string;

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    public email: string;

    @IsNotEmpty()
    @IsStrongPassword()
    public password: string;
}