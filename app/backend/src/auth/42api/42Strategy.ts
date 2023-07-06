import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { DoneCallback, Profile } from "passport";
import { Strategy } from "passport-42"

@Injectable()
export class fortyTwoStrategy extends PassportStrategy(Strategy, '42')
{
    constructor(private readonly configService: ConfigService) {
        super({
            clientID: configService.get<string>('42_CLIENT_ID'),
            clientSecret: configService.get<string>('42_SECRET'),
            callbackURL: configService.get<string>('42_REDIRECT_URI'),
        })
    }
    async validate(access_token: string, refresh_token: string, profile: Profile, done: DoneCallback): Promise<any>
    {
        console.log(profile);
        const user = {
            provider: '42',
            providerId: profile.id,
            username: profile.username,
            email: profile.emails[0].value,
            firstname: profile.name.familyName,
            lastname: profile.name.givenName,
        };
        done(null, user);
    }
}
