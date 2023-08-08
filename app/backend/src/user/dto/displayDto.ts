import { IsNotEmpty, IsString} from 'class-validator';

export class displayNameDto {
    
    @IsNotEmpty()
    @IsString()
    public firstname: string

    @IsNotEmpty()
    @IsString()
    public lastname: string
}
