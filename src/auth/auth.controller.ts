import { HttpService } from '@nestjs/axios';
import { Controller, Get, HttpStatus, Query, Redirect, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly configService: ConfigService,
        private readonly httpServer: HttpService) {}
    @Get()
    @Redirect()
    entrypoint() {
        const clientId = this.configService.get<string>('42_CLIENT_ID');
        const redirectUri = this.configService.get<string>('42_REDIRECT_URI');
        return { url: `https://api.intra.42.fr/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`};
    }
    @Get('42api')
    api_token(@Req() req: Request)
    {
        const tokenEndpoint = 'https://api.intra.42.fr/oauth/token';
        const clientId = this.configService.get<string>('42API_CLIENT_ID');
        const clientSecret = this.configService.get<string>('42API_CLIENT_SECRET');
        const redirectUri = this.configService.get<string>('42API_REDIRECT_URI');
        const query_code = req.query.code;
        const requestBody = {
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        code: query_code,
        redirect_uri: redirectUri,
        };
        const reponse = this.httpServer.post(tokenEndpoint, requestBody);
        return 'success';
    }

}

/*
@Injectable()
export class TokenService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getToken(code: string): Promise<AxiosResponse<any>> {
    const tokenEndpoint = 'https://api.intra.42.fr/oauth/token';
    const clientId = this.configService.get<string>('42API_CLIENT_ID');
    const clientSecret = this.configService.get<string>('42API_CLIENT_SECRET');
    const redirectUri = this.configService.get<string>('42API_REDIRECT_URI');

    const requestBody = {
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      redirect_uri: redirectUri,
    };

    return this.httpService.post(tokenEndpoint, requestBody).toPromise();
  }
}
*/