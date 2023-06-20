import { HttpService } from '@nestjs/axios';
import { Controller, Get, HttpStatus, Query, Redirect, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, response } from 'express';
import { lastValueFrom, map, tap } from 'rxjs';
import { UserRepository } from 'src/databases/User/user.repository';
import { json } from 'stream/consumers';

@Controller('auth')
export class AuthController {
    constructor(private readonly configService: ConfigService,
        private readonly httpServer: HttpService,
        @InjectRepository(UserRepository) private userRepository: UserRepository) {}
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
        const user = this.userRepository.findOneBy({
            access_token: access_token
        })
        console.log(access_token);
        console.log(expires_in);
        // if(user)
        // {
        //     if()
        // }
        // else
        // {

        // }
        return 'success';
    }


}
