"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const BlockedTokenList_service_1 = require("../../databases/BlockedTokenList/BlockedTokenList.service");
const user_service_1 = require("../../user/user.service");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    constructor(configService, userService, BlockedTokenService) {
        const extractJwtFromCookie = (req) => {
            this.request = req;
            let token = null;
            if (req && req.cookies) {
                token = req.cookies['access_token'];
                if (!token)
                    token = passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken()(req);
            }
            return token;
        };
        super({
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: extractJwtFromCookie,
        });
        this.configService = configService;
        this.userService = userService;
        this.BlockedTokenService = BlockedTokenService;
    }
    async validate(payload) {
        const user = await this.userService.findUserByEmail(payload.email);
        console.log('UUser is: ', user);
        if (!user)
            throw new common_1.UnauthorizedException('Please log in to continue');
        if ((await this.BlockedTokenService.blackListHasToken(this.request.cookies['access_token'])) === true)
            throw new common_1.UnauthorizedException('token is not valid');
        return {
            id: payload.sub,
            email: payload.email,
        };
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        user_service_1.UserService,
        BlockedTokenList_service_1.BlockedTokenlistService])
], JwtStrategy);
//# sourceMappingURL=jwtStrategy.js.map