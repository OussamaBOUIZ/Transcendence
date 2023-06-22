import { HttpService } from '@nestjs/axios';
import { Controller, Get, HttpStatus, Query, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { lastValueFrom, map, tap } from 'rxjs';
import { User } from 'src/databases/user.entity';
import { json } from 'stream/consumers';
import { Repository } from 'typeorm';
import { GoogleAuthGuard } from './googleapi/googleguard';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt/jwtGuard';
import { FortyTwoGuard } from './42api/42guard';
import {AuthGuard} from "@nestjs/passport";

@Controller('auth')
export class AuthController {
    constructor(private readonly configService: ConfigService,
                private readonly httpServer: HttpService,
                @InjectRepository(User) private userRepository: Repository<User>,
                private readonly authService: AuthService) {}
    @Get('google')
    @UseGuards(GoogleAuthGuard)
    googleLogin() {}

    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    async googleRedirect(@Req() googlereq, @Res() res: Response)
    {
        const token = await this.authService.signin(googlereq.user);
        res.cookie('access_token', token, {
            maxAge: 2592000000,
            secure: false,
        });
        return res.status(HttpStatus.OK).send('google Sucessful');
    }

    @Get('yes')
    @UseGuards(AuthGuard('jwt'))
    retyes(){
        return 'yes';
    }
    @Get('42')
    @UseGuards(FortyTwoGuard)
    fortyTwoLogin() {}

    @Get('42api')
    @UseGuards(FortyTwoGuard)
    async fortyTwoRedirect(@Req() fortyTworeq, @Res() res: Response)
    {
        const token = await this.authService.signin(fortyTworeq.user);
        console.log(`token ${token}`);
        res.cookie('access_token', token, {
            maxAge: 2592000000,
            secure: false,
        });
        return res.status(HttpStatus.OK).send('42 Sucessful');
    }

}