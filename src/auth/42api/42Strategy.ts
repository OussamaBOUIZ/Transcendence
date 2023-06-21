import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile } from "passport";
import { Strategy } from "passport-42"

@Injectable()
export class fortyTwoStrategy extends PassportStrategy(Strategy, '42')
{
    constructor(private readonly configService: ConfigService) {
        super({
            clientID: configService.get<string>('42_CLIENT_ID'),
            clientSecret: configService.get<string>('42_SECRET'),
            callbackURL: configService.get<string>('42_REDIRECT_URI'),
            scope: [
                'profile',
                'email'
            ],
        })
    }
    async validate(access_token: string, refresh_token: string, profile: Profile, done): Promise<any>
    {
        // const { id, name, emails, photos } = profile;

        // const user = {
        //     provider: 'google',
        //     providerId: id,
        //     email: emails[0].value,
        //     firstname: `${name.givenName}`,
        //     lastname: `${name.familyName}`,
        //     picture: photos[0].value,
        // };
        // done(null, user);
    }
}
