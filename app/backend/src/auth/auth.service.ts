import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';
import {User} from 'src/databases/user.entity';
import * as argon from 'argon2'
import { Response } from 'express';
import { UserService } from 'src/user/user.service';
import { AchievementService } from 'src/databases/achievement/achievement.service';

type tokenPayload = {
    id: number,
    email: string
}

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService
    , private readonly configService: ConfigService
    , private readonly userService: UserService
    , private readonly achievementService: AchievementService)
    {}

    async apisignin(user)
    {
        if(!user) {
            return null;
        }
        const userFound = await this.searchForEmail(user.email);
        if(!userFound)
            return await this.apiregisterUser(user);
        userFound.firstLog = false;
        await this.userService.saveUser(userFound);
        const secret = this.configService.get<string>('JWT_SECRET');
        return this.jwtService.sign ({ 
            id: userFound.id,
            email: userFound.email},
             {secret}
            );
    }

    async apiregisterUser(user)
    {
        const newUser = new User();
        newUser.email = user.email;
        newUser.status = "Online";
        await this.userService.saveUser(newUser);
        this.achievementService.createAchievements(newUser);
        const secret = this.configService.get<string>('JWT_SECRET');
        const userToken = this.jwtService.sign({
            id: newUser.id,
            email: newUser.email}, {secret});
        return this.jwtService.sign({
            id: newUser.id,
            email: newUser.email}, {secret});
    }
    async searchForEmail(email)
    {
        const user = await this.userService.findUserByEmail(email);
        if(user)
            return user;
        return null;
    }

    signToken(user: User)
    {
        const secret = this.configService.get<string>('JWT_SECRET');
        return this.jwtService.sign({
            id: user.id,
            email: user.email
        }, {secret});
    }

    setResCookie(res: Response, token: string)
    {
        res.cookie('access_token', token, {
            maxAge: 2592000000,
            secure: false,
        });
    }
}
