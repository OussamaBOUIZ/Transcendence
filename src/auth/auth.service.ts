import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtSecretRequestType, JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/databases/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

    generateJwt(payload) {
        return this.jwtService.sign(payload);
      }
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
            return this.registerUser(user);
        const secret = this.configService.get<string>('JWT_SECRET');
        return this.jwtService.sign({
            id: userFound.id,
            email: userFound.email}, {secret});
        
    }

    async registerUser(user)
    {
        const createdUser = this.userRepository.create(user);
        createdUser.
    }
    async searchForEmail(email)
    {
        const user = await this.userRepository.findOneBy({email: email});
        if(user)
            return user;
        return null;
    }
}
