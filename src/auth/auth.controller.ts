import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, HttpStatus, Post, Query, Redirect, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
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

@Controller('auth')
export class AuthController {
    constructor(private readonly configService: ConfigService,
        private readonly httpServer: HttpService,
        @InjectRepository(User) private userRepository: Repository<User>,
        private readonly authService: AuthService) {}
    @Get('google')
    @UseGuards(GoogleAuthGuard)
    googleLogin() {}

    @Post('google/callback')
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

    @UseGuards(JwtGuard)
    @Get('yes')
    async retyes()
    {
        const user = await this.userRepository.findOneBy({email: 'issam@gmail.com'});
        if(user)
            return user;
        return 'no user found with the given email';
    }

    @Get('42')
    @UseGuards(FortyTwoGuard)
    fortyTwoLogin() {}

    @Post('42api')
    @UseGuards(FortyTwoGuard)
    async fortyTwoRedirect(@Req() fortyTworeq, @Res() res: Response)
    {
        const token = await this.authService.apisignin(fortyTworeq.user);
        res.cookie('access_token', token, {
            maxAge: 2592000000,
            secure: false,
        });
        return res.status(HttpStatus.OK).send('42 Sucessful');
    }

    @Post('signin') 
    async localSignIn(@Body() userDto: userSignInDto, @Res() res: Response) {
        const token = await this.authService.signin(userDto);
        console.log(`token : ${token}`);
        res.cookie('access_token', token, {
            maxAge: 2592000000,
            secure: false,
        });
        return res.status(HttpStatus.OK).send('local Sucessful');
    }
    
    @Post('signup')
    async localSignUp(@Body() userDto: userSignUpDto, @Res() res: Response) {
        const token = await this.authService.signup(userDto);
        console.log(`token : ${token}`);
        res.cookie('access_token', token, {
            maxAge: 2592000000,
            secure: false,
        });
        return res.status(HttpStatus.OK).send('local Sucessful');
    }
}
