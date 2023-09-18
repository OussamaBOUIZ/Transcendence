import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/databases/user.entity';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';
import { AchievementService } from 'src/databases/achievement/achievement.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly configService;
    private readonly userService;
    private readonly achievementService;
    constructor(jwtService: JwtService, configService: ConfigService, userService: UserService, achievementService: AchievementService);
    apisignin(user: any): Promise<string>;
    apiregisterUser(user: any): Promise<string>;
    searchForEmail(email: any): Promise<User>;
    validateUser(email: string, password: string): Promise<string>;
    signToken(user: User): string;
    setResCookie(res: Response, token: string): void;
}
