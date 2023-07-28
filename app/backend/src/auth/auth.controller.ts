import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, HttpStatus, Post, Query, Redirect, Req, Res, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { lastValueFrom, map, tap } from 'rxjs';
import { User } from 'src/databases/user.entity';
import { Repository } from 'typeorm';
import { GoogleAuthGuard } from './googleapi/googleguard';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt/jwtGuard';
import { FortyTwoGuard } from './42api/42guard';
import { AuthGuard } from '@nestjs/passport';
import { userSignInDto } from './dto/userSignInDto';
import { userSignUpDto } from './dto/userSignUpDto';
import { MailTemplate } from './MailService/mailer.service';
import { ViewAuthFilter } from 'src/Filter/filter';
import { FormCheck } from './Filter/uno';

@Controller('auth')
export class AuthController {
    constructor(private readonly configService: ConfigService,
        private readonly httpServer: HttpService,
        private readonly authService: AuthService,
        private readonly mailTemp: MailTemplate) {}


    @Get('google')
    @UseGuards(GoogleAuthGuard)
    googleLogin() {}

    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    async googleRedirect(@Req() googlereq, @Res() res: Response)
    {
        const token = await this.authService.apisignin(googlereq.user);
        this.authService.setResCookie(res, token);
        return res.redirect('http://localhost:5173/home');
    }
    
    @Get('test')
    test() {
        // this.mailTemp.sendEmail();
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
        console.log(`token ${token}`)
        if(!token)
            return res.redirect('http://localhost:5173/home');
        this.authService.setResCookie(res, token);
        return res.redirect('http://localhost:5173/home');
    }

    @Post('signin') 
    async localSignIn(@Body() userDto: userSignInDto, @Res() res: Response) {
        const token = await this.authService.validateUser(userDto.email, userDto.password);
        this.authService.setResCookie(res, token);
        return res.status(200).send('user signed in successfully')
    }
    
    @Post('signup')
    async localSignUp(@Body() userDto: userSignUpDto, @Res() res: Response) {
        const token = await this.authService.signup(userDto);
        if(token === null)
            return res.status(400).send(`email already exists`);
        this.authService.setResCookie(res, token);
        // this.mailTemp.sendEmail(userDto.email);
        return res.status(200).send('Please confirm your email');
    }
    @Get('getuser')
    @UseGuards(JwtGuard)
    async getuser(@Req() req: Request)
    {
        return await this.authService.retUserData(req.cookies['access_token'])
    }
}
