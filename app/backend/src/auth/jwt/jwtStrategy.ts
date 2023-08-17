import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { BlockedTokenlistService } from "src/databases/BlockedTokenList/BlockedTokenList.service";
import { UserService } from "src/user/user.service";

export type JwtPayload = {
    sub: string;
    email: string;
  };
  
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') 
{
    private request: any;
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService,
        private readonly BlockedTokenService: BlockedTokenlistService
    ) {
        const extractJwtFromCookie = (req) => {
                this.request = req;
                let token = null;
                if (req && req.cookies) {
                    token = req.cookies['access_token'];
                    if(!token)
                        token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
                }
                return token;
            };
        super({
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
            jwtFromRequest: extractJwtFromCookie,
        });
    }

    async validate(payload: JwtPayload) {
        const user = await this.userService.findUserByEmail(payload.email);
        if (!user) throw new UnauthorizedException('Please log in to continue');
        if((await this.BlockedTokenService.blackListHasToken(this.request.cookies['access_token'])) === true)
            throw new UnauthorizedException('token is not valid');
        return {
            id: payload.sub,
            email: payload.email,
        };
    }
}