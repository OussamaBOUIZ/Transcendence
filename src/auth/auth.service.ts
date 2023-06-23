import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/databases/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/userdto';
import * as argon from 'argon2'

@Injectable()
export class AuthService {

    constructor(@InjectRepository (User) private userRepository: Repository<User>
    , private readonly jwtService: JwtService
    , private readonly configService: ConfigService)
    {
    }

    async apisignin(user)
    {
        if(!user) {
            throw new BadRequestException('Unauthenticated');
        }
        const userFound = await this.searchForEmail(user.email);
        if(!userFound)
            return await this.apiregisterUser(user);
        const secret = this.configService.get<string>('JWT_SECRET');
        return this.jwtService.sign ({ 
            id: userFound.id,
            email: userFound.email}, {secret});
        
    }

    async apiregisterUser(user)
    {
        const newUser = new User();
        newUser.email = user.email;
        newUser.firstname = user.firstname;
        newUser.lastname = user.lastname;
        newUser.username = user.provider === '42' ? user.username : user.firstname[0] + user.lastname;
        await this.userRepository.save(newUser);
        const secret = this.configService.get<string>('JWT_SECRET');
        return this.jwtService.sign({
            id: newUser.id,
            email: newUser.email}, {secret});
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

    async signin(userdto: UserDto)
    {
        const userFound = await this.userRepository.findOneBy({email: userdto.email});
        if(!userFound)
            throw new ForbiddenException('incorrect credentials');
            const userCorrect = await argon.verify(userFound.password, userdto.password);
        if(userCorrect)
            throw new ForbiddenException('incorrect credentials');
        const secret = this.configService.get<string>('JWT_SECRET');
        return this.jwtService.sign({
            id: userFound.id,
            email: userFound.email
        }, {secret});
    }

    async signup(userdto: UserDto)
    {
        const pass_hash = await argon.hash(userdto.password);

        const newUser = new User();
        newUser.email = userdto.email;
        newUser.firstname = userdto.firstName;
        newUser.lastname = userdto.lastName;
        newUser.username = userdto.firstName[0] + userdto.lastName;
        newUser.password = userdto.password;
        await this.userRepository.save(newUser);
        const secret = this.configService.get<string>('JWT_SECRET');
        return this.jwtService.sign({
            id: newUser.id,
            email: newUser.email
        }, {secret});
    }
}
