"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const game_service_1 = require("./game.service");
const game_entity_1 = require("../databases/game.entity");
const user_service_1 = require("../user/user.service");
const stats_entity_1 = require("../databases/stats.entity");
const user_entity_1 = require("../databases/user.entity");
const achievement_entity_1 = require("../databases/achievement/achievement.entity");
const match_history_entity_1 = require("../databases/match_history.entity");
const jwt_1 = require("@nestjs/jwt");
const game_controller_1 = require("./game.controller");
const achievement_service_1 = require("../databases/achievement/achievement.service");
const game_gateway_1 = require("./game.gateway");
let gameModule = class gameModule {
};
exports.gameModule = gameModule;
exports.gameModule = gameModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([game_entity_1.Game, stats_entity_1.Stats, user_entity_1.User, achievement_entity_1.Achievement, match_history_entity_1.Match_history, game_entity_1.Game])],
        providers: [game_gateway_1.GameGateway, game_service_1.gameService, user_service_1.UserService, jwt_1.JwtService, achievement_service_1.AchievementService],
        controllers: [game_controller_1.gameController]
    })
], gameModule);
//# sourceMappingURL=game.module.js.map