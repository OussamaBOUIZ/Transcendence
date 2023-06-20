import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile } from "passport-google-oauth20";

@Injectable()
export class googleStrategy extends PassportStrategy(Strategy)
{
    constructor(private readonly configService: ConfigService) {
        super({
            clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
            clientSecret: configService.get<string>('GOOGLE_SECRET'),
            callbackURI: configService.get<string>('GOOGLE_REDIRECT_URI'),
            scope: [
                'profile',
                'email'
            ],
        });
    }
    async validate(access_token: string, refresh_token: string, profile: Profile)
    {
        
    }
}