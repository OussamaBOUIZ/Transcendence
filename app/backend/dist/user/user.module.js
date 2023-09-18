"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const user_entity_1 = require("../databases/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const achievement_entity_1 = require("../databases/achievement/achievement.entity");
const stats_entity_1 = require("../databases/stats.entity");
const BlockedTokenList_service_1 = require("../databases/BlockedTokenList/BlockedTokenList.service");
const BlockedTokenList_entity_1 = require("../databases/BlockedTokenList/BlockedTokenList.entity");
const match_history_entity_1 = require("../databases/match_history.entity");
const game_entity_1 = require("../databases/game.entity");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, achievement_entity_1.Achievement, stats_entity_1.Stats, match_history_entity_1.Match_history, BlockedTokenList_entity_1.BlockedTokenList, game_entity_1.Game])],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, jwt_1.JwtService, BlockedTokenList_service_1.BlockedTokenlistService]
    })
], UserModule);
//# sourceMappingURL=user.module.js.map