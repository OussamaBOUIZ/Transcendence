import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile, VerifyCallback } from "passport-google-oauth20";
import * as fs from 'fs';

@Injectable()
export class googleStrategy extends PassportStrategy(Strategy, 'google')
{
    constructor(private readonly configService: ConfigService) {
        super({
            clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
            clientSecret: configService.get<string>('GOOGLE_SECRET'),
            callbackURL: configService.get<string>('GOOGLE_REDIRECT_URI'),
            scope: [
                'profile',
                'email'
            ],
        })
    }
    async validate(access_token: string, refresh_token: string, profile: Profile, done: VerifyCallback): Promise<any>
    {
        const { id, name, emails, photos } = profile;

        const user = {
            provider: 'google',
            providerId: id,
            email: emails[0].value,
            firstname: `${name.givenName}`,
            lastname: `${name.familyName}`,
            picture: photos[0].value,
        };
        done(null, user);
    }
}
