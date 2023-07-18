import { Injectable } from '@nestjs/common';
import { User } from 'src/databases/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

type tokenPayload = {
    id: number,
    email: string
};

@Injectable()
export class UserService {
    constructor(@InjectRepository (User) private userRepo: Repository<User>
    , private readonly jwtService: JwtService) {}

    async saveUser(user: User)
    {
        await this.userRepo.save(user);
    }
    async findUserByEmail(email: string)
    {
        const user = await this.userRepo.findOneBy({email: email});
        return user;  
    }

    async findUserById(id: number)
    {
        const user = await this.userRepo.findOneBy({id: id});
        return user;
    }

    async getUserFromJwt(userToken: string)
    {
        console.log('user token: ')
        console.log(userToken);
        if(!userToken)
            return null;
        const payload = this.jwtService.decode(userToken.split(' ')[1]) as tokenPayload;
        const user: User = await this.userRepo.findOneBy({id: payload.id});
        return user;
    }
}
