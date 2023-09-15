"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const axios_1 = require("@nestjs/axios");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../databases/user.entity");
const googleStrategy_1 = require("./googleapi/googleStrategy");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const auth_service_1 = require("./auth.service");
const _42Strategy_1 = require("./42api/42Strategy");
const jwtStrategy_1 = require("./jwt/jwtStrategy");
const passport_1 = require("@nestjs/passport");
const mailer_service_1 = require("./MailService/mailer.service");
const user_service_1 = require("../user/user.service");
const achievement_service_1 = require("../databases/achievement/achievement.service");
const achievement_entity_1 = require("../databases/achievement/achievement.entity");
const stats_entity_1 = require("../databases/stats.entity");
const BlockedTokenList_service_1 = require("../databases/BlockedTokenList/BlockedTokenList.service");
const BlockedTokenList_entity_1 = require("../databases/BlockedTokenList/BlockedTokenList.entity");
const match_history_entity_1 = require("../databases/match_history.entity");
const game_entity_1 = require("../databases/game.entity");
const jwtFactory = {
    useFactory: async (configService) => ({
        global: true,
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '3d' }
    }),
    inject: [config_1.ConfigService],
};
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        controllers: [auth_controller_1.AuthController],
        imports: [axios_1.HttpModule, typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, achievement_entity_1.Achievement, stats_entity_1.Stats, BlockedTokenList_entity_1.BlockedTokenList, match_history_entity_1.Match_history, game_entity_1.Game]),
            jwt_1.JwtModule.registerAsync(jwtFactory), passport_1.PassportModule],
        providers: [googleStrategy_1.googleStrategy, auth_service_1.AuthService, _42Strategy_1.fortyTwoStrategy, jwtStrategy_1.JwtStrategy,
            mailer_service_1.MailTemplate, user_service_1.UserService, achievement_service_1.AchievementService, BlockedTokenList_service_1.BlockedTokenlistService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map