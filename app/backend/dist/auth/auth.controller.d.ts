import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
export declare class AuthController {
    private readonly configService;
    private readonly httpServer;
    private readonly authService;
    private readonly userService;
    constructor(configService: ConfigService, httpServer: HttpService, authService: AuthService, userService: UserService);
    googleLogin(): void;
    googleRedirect(googlereq: any, res: Response): Promise<void>;
    fortyTwoLogin(): void;
    fortyTwoRedirect(fortyTworeq: any, res: Response): Promise<void>;
    getQrCode(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getTokenValidity(req: Request, res: Response): Response<any, Record<string, any>>;
}
