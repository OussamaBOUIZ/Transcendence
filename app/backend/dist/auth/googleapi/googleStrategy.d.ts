import { ConfigService } from "@nestjs/config";
import { Strategy, Profile, VerifyCallback } from "passport-google-oauth20";
declare const googleStrategy_base: new (...args: any[]) => Strategy;
export declare class googleStrategy extends googleStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate(access_token: string, refresh_token: string, profile: Profile, done: VerifyCallback): Promise<any>;
}
export {};
