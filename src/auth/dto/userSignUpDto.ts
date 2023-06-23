
import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword} from 'class-validator';

export class userSignUpDto {

    @IsNotEmpty()
    @IsString()
    public firstName: string;
    
    @IsNotEmpty()
    @IsString()
    public lastName: string;

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    public email: string;

    @IsNotEmpty()
    @IsStrongPassword()
    public password: string;
}