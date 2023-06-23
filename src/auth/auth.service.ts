import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/databases/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

    constructor(@InjectRepository (User) private userRepository: Repository<User>
    , private readonly jwtService: JwtService
    , private readonly configService: ConfigService)
    {
    }

    async signin(user)
    {
        if(!user) {
            throw new BadRequestException('Unauthenticated');
        }
        const userFound = await this.searchForEmail(user.email);
        if(!userFound)
            return await this.registerUser(user);
        const secret = this.configService.get<string>('JWT_SECRET');
        return this.jwtService.sign ({ 
            id: userFound.id,
            email: userFound.email}, {secret});
        
    }

    async registerUser(user)
    {
        const createdUser = new User();
        createdUser.email = user.email;
        createdUser.firstname = user.firstname;
        createdUser.lastname = user.lastname;
        createdUser.username = user.provider === '42' ? user.username : user.firstname[0] + user.lastname;
        createdUser.password = user.provider !== '42' && user.provider !== 'google' ? user.password : '';
        await this.userRepository.save(createdUser);
        const secret = this.configService.get<string>('JWT_SECRET');
        return this.jwtService.sign({
            id: createdUser.id,
            email: createdUser.email}, {secret});
    }
    async searchForEmail(email)
    {
        const user = await this.userRepository.findOneBy({email: email});
        if(user)
            return user;
        return null;
    }

    async validateUser(username: string, password: string)
    {
        const foundUser = await this.userRepository.findOneBy({username: username});
        if(foundUser && foundUser.password === password)
            return foundUser;
        return null;
    }
}
