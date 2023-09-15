"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelModule = void 0;
const common_1 = require("@nestjs/common");
const channel_controller_1 = require("./channel.controller");
const channel_service_1 = require("./channel.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../databases/user.entity");
const channel_entity_1 = require("../databases/channel.entity");
const channel_gateway_1 = require("./channel.gateway");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const message_entity_1 = require("../databases/message.entity");
const muted_users_entity_1 = require("../databases/muted_users.entity");
const achievement_entity_1 = require("../databases/achievement/achievement.entity");
const stats_entity_1 = require("../databases/stats.entity");
const match_history_entity_1 = require("../databases/match_history.entity");
const game_entity_1 = require("../databases/game.entity");
let ChannelModule = class ChannelModule {
};
exports.ChannelModule = ChannelModule;
exports.ChannelModule = ChannelModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, channel_entity_1.Channel, message_entity_1.Message, muted_users_entity_1.Muted_users, achievement_entity_1.Achievement, stats_entity_1.Stats, match_history_entity_1.Match_history, game_entity_1.Game])],
        controllers: [channel_controller_1.ChannelController],
        providers: [channel_service_1.ChannelService, channel_gateway_1.ChannelGateway, jwt_1.JwtService, user_service_1.UserService]
    })
], ChannelModule);
//# sourceMappingURL=channel.module.js.map