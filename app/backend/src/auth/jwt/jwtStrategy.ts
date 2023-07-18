import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from "src/databases/user.entity";
import { UserService } from "src/user/user.service";
import { Repository } from "typeorm";

export type JwtPayload = {
    sub: string;
    email: string;
  };
  
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') 
{
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService
    ) {
        const extractJwtFromCookie = (req) => {
        let token = null;
        if (req && req.cookies) {
            token = req.cookies['access_token'];
        }
        return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
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

        return {
            id: payload.sub,
            email: payload.email,
        };
    }
}