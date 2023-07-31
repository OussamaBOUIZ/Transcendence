
import { BadRequestException, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/databases/user.entity';
import * as argon from 'argon2'
import { userSignUpDto } from './dto/userSignUpDto';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';
import { AchievementService } from 'src/databases/achievement/achievement.service';
import {authenticator} from 'otplib'

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
        const secret = this.configService.get<string>('JWT_SECRET');
        return this.jwtService.sign ({ 
            id: userFound.id,
            email: userFound.email}, {secret});
        
    }

    async apiregisterUser(user)
    {
        console.log(user);
        
        const newUser = new User();
        newUser.email = user.email;
        newUser.firstname = user.firstname;
        newUser.lastname = user.lastname;
        newUser.username = user.provider === '42' ? user.username : user.firstname[0] + user.lastname;
        await this.userService.saveUser(newUser);
        this.achievementService.createAchievements(newUser);
        const secret = this.configService.get<string>('JWT_SECRET');
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

    async validateUser(email: string, password: string)
    {
        const foundUser = await this.userService.findUserByEmail(email);
        if(!foundUser)
            return null;
        const userCorrect = await argon.verify(foundUser.password, password);
        if(!userCorrect || !foundUser.isEmailConfirmed)
            return null;
        return this.signToken(foundUser);
    }

    otpsetup(user: User)
    {
        const secret = authenticator.generateSecret();
        const otpPathUrl = authenticator.keyuri(user.email, 'Transcendence', secret);
        return {
            secret,
            otpPathUrl
        }
    }
    signToken(user: User)
    {
        const secret = this.configService.get<string>('JWT_SECRET');
        return this.jwtService.sign({
            id: user.id,
            email: user.email
        }, {secret});
    }

    async signup(userdto: userSignUpDto)
    {
        const pass_hash = await argon.hash(userdto.password);
        try{
            const newUser = new User();
            newUser.email = userdto.email;
            newUser.firstname = userdto.firstname;
            newUser.lastname = userdto.lastname;
            newUser.username = userdto.firstname[0] + userdto.lastname;
            newUser.password = pass_hash;
            await this.userService.saveUser(newUser);
            this.achievementService.createAchievements(newUser);
            const secret = this.configService.get<string>('JWT_SECRET');
            return this.jwtService.sign({
                id: newUser.id,
                email: newUser.email
            }, {secret});

        }
        catch (error){
            return null;
        }
    }
    setResCookie(res: Response, token: string)
    {
        res.cookie('access_token', token, {
            maxAge: 2592000000,
            secure: false,
        });
    }
}
