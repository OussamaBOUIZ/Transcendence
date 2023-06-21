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
    async googleRedirect(@Req() req, @Res() res: Response)
    {
        const token = await this.authService.signin(req.user);
        res.cookie('access_token', token, {
            maxAge: 2592000000,
            sameSite: true,
            secure: false,
        });
        return res.status(HttpStatus.OK).send('google Sucessful');
    }

    @Get('42')
    @UseGuards(FortyTwoGuard)
    fortyTwoLogin() {}

    @Get('42api')
    @UseGuards(FortyTwoGuard)
    async fortyTwoRedirect(@Req() req, @Res() res: Response)
    {
        console.log(req.user);
        return 'yes';
    }


}
