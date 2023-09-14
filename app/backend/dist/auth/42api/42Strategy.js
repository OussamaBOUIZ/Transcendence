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
exports.fortyTwoStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const passport_42_1 = require("passport-42");
let fortyTwoStrategy = class fortyTwoStrategy extends (0, passport_1.PassportStrategy)(passport_42_1.Strategy, '42') {
    constructor(configService) {
        super({
            clientID: configService.get('42_CLIENT_ID'),
            clientSecret: configService.get('42_SECRET'),
            callbackURL: configService.get('42_REDIRECT_URI'),
        });
        this.configService = configService;
    }
    async validate(access_token, refresh_token, profile, done) {
        const user = {
            provider: '42',
            providerId: profile.id,
            username: profile.username,
            email: profile.emails[0].value,
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
        };
        done(null, user);
    }
};
exports.fortyTwoStrategy = fortyTwoStrategy;
exports.fortyTwoStrategy = fortyTwoStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], fortyTwoStrategy);
//# sourceMappingURL=42Strategy.js.map