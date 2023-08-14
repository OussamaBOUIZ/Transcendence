import { HttpService } from '@nestjs/axios';
import { Controller, Get, Req, Res, UseFilters, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { GoogleAuthGuard } from './googleapi/googleguard';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt/jwtGuard';
import { FortyTwoGuard } from './42api/42guard';
import { MailTemplate } from './MailService/mailer.service';
import {toDataURL, toFileStream} from "qrcode"
import { UserService } from 'src/user/user.service';
import { tokenValidity } from './Filter/tokenFilter';

@Controller('auth')
export class AuthController {
    constructor(private readonly configService: ConfigService,
        private readonly httpServer: HttpService,
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly mailTemp: MailTemplate) {}


    @Get('google')
    @UseGuards(GoogleAuthGuard)
    googleLogin() {}

    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    async googleRedirect(@Req() googlereq, @Res() res: Response)
    {
        const token = await this.authService.apisignin(googlereq.user);
        const user = await this.userService.userHasAuth(googlereq.user.email);
        if(user)
            return res.redirect('http://localhost:5173/auth');
        this.authService.setResCookie(res, token);
        return res.redirect('http://localhost:5173/');
    }

    @Get('42')
    @UseGuards(FortyTwoGuard)
    fortyTwoLogin() {
    }
    @Get('42api')
    @UseGuards(FortyTwoGuard)
    async fortyTwoRedirect(@Req() fortyTworeq, @Res() res: Response)
    {
        const token = await this.authService.apisignin(fortyTworeq.user);
        if(!token)
            return res.redirect('http://localhost:5173/');
        this.authService.setResCookie(res, token);
        const user = await this.userService.userHasAuth(fortyTworeq.user.email);
        if(user)
            return res.redirect('http://localhost:5173/auth');
        return res.redirect('http://localhost:5173/');
    }
    @Get('qrcode')
    @UseGuards(JwtGuard)
    async getQrCode(@Req() req: Request, @Res() res: Response)
    {
        const user = await this.userService.getUserFromJwt(req.cookies['access_token']);
        const path = await toDataURL(user.otpPathUrl);
        return res.status(200).send(path);
    }
    @Get('tokenValidity')
    @UseGuards(JwtGuard)
    @UseFilters(tokenValidity)
    getTokenValidity(@Req() req: Request, @Res() res: Response)
    {
        return true;
    }
}
