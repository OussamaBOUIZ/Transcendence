import { HttpService } from '@nestjs/axios';
import { Controller, Get, HttpStatus, Query, Redirect, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, response } from 'express';
import { lastValueFrom, map, tap } from 'rxjs';
import { User } from 'src/databases/user.entity';
import { json } from 'stream/consumers';
import { Repository } from 'typeorm';

@Controller('auth')
export class AuthController {
    constructor(private readonly configService: ConfigService,
        private readonly httpServer: HttpService,
        @InjectRepository(User) private userRepository: Repository<User>) {}
    @Get()
    @Redirect()
    entrypoint() {
        const clientId = this.configService.get<string>('42_CLIENT_ID');
        const redirectUri = this.configService.get<string>('42_REDIRECT_URI');
        return { url: `https://api.intra.42.fr/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`};
    }
    @Get('42api')
    async api_token(@Req() req: Request)
    {
        const tokenEndpoint = 'https://api.intra.42.fr/oauth/token';
        const clientId = this.configService.get<string>('42_CLIENT_ID');
        const clientSecret = this.configService.get<string>('42_SECRET');
        const redirectUri = this.configService.get<string>('42_REDIRECT_URI');
        const query_code = req.query.code;
        const requestBody = {
        grant_type: 'authorization_code',
        client_id: `${clientId}`,
        client_secret: `${clientSecret}`,
        code: query_code,
        redirect_uri: `${redirectUri}`,
        };
        const response = await lastValueFrom(this.httpServer.post(tokenEndpoint, requestBody));
        const { access_token, token_type, expires_in, refresh_token, scope, created_at } = response.data;
        // console.log(access_token);
        // const user = await this.userRepository.findOneBy({
        //     access_token: access_token
        // })
        // if(user)
        // {
        //     console.log(user);
        // }
        // else
        // {
            const newuser = new User();
            // newuser.access_token = access_token;
            // newuser.token_expire = expires_in;
            // newuser.refresh_token = refresh_token;
            // await this.userRepository.save(newuser);


        // }
        return 'success';
    }


}
