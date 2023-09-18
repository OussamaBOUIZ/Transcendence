import { ConfigService } from "@nestjs/config";
import { DoneCallback, Profile } from "passport";
declare const fortyTwoStrategy_base: new (...args: any[]) => any;
export declare class fortyTwoStrategy extends fortyTwoStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate(access_token: string, refresh_token: string, profile: Profile, done: DoneCallback): Promise<any>;
}
export {};
