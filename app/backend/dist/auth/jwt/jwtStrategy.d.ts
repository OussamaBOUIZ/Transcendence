import { ConfigService } from "@nestjs/config";
import { BlockedTokenlistService } from "src/databases/BlockedTokenList/BlockedTokenList.service";
import { UserService } from "src/user/user.service";
export type JwtPayload = {
    sub: string;
    email: string;
};
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private readonly userService;
    private readonly BlockedTokenService;
    private request;
    constructor(configService: ConfigService, userService: UserService, BlockedTokenService: BlockedTokenlistService);
    validate(payload: JwtPayload): Promise<{
        id: string;
        email: string;
    }>;
}
export {};
