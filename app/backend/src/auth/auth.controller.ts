import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, HttpStatus, Post, Query, Redirect, Req, Res, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
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
import { LocalGuard } from './local/localguard';
import { MailTemplate } from './MailService/mailer.service';
import { ViewAuthFilter } from 'src/Filter/filter';

@Controller('auth')
export class AuthController {
    constructor(private readonly configService: ConfigService,
        private readonly httpServer: HttpService,
        @InjectRepository(User) private userRepository: Repository<User>,
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
        res.redirect('http://localhost:5173/');
        return 'ok'; 
    }
    
    @Get('test')
    test() {
        this.mailTemp.sendEmail();
    }

    @Get('42')
    @UseGuards(FortyTwoGuard)
    fortyTwoLogin() {

    }


    @Get('42api')
    @UseFilters(ViewAuthFilter)
    @UseGuards(FortyTwoGuard)
    async fortyTwoRedirect(@Req() fortyTworeq, @Res() res: Response)
    {
        const token = await this.authService.apisignin(fortyTworeq.user);
        this.authService.setResCookie(res, token);
        res.redirect('http://localhost:5173/');
        return 'yes';
    }

    @Post('signin') 
    @UseGuards(LocalGuard)
    async localSignIn(@Req() userData, @Res() res: Response) {
        const token = await this.authService.signToken(userData.user);
        this.authService.setResCookie(res, token);
        res.redirect('http://localhost:5173/');
        return 'yes';
    }
    
    @Post('signup')
    async localSignUp(@Body() userDto: userSignUpDto, @Res() res: Response) {
        const token = await this.authService.signup(userDto);
        this.authService.setResCookie(res, token);
        res.redirect('http://localhost:5173/');
        return 'yes';
    }
}
