"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGatewayModule = void 0;
const common_1 = require("@nestjs/common");
const userchat_gateway_1 = require("./userchat.gateway");
const userchat_service_1 = require("./userchat.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../databases/user.entity");
const jwt_1 = require("@nestjs/jwt");
const wsGuard_1 = require("../auth/socketGuard/wsGuard");
const userchat_entity_1 = require("../databases/userchat.entity");
const message_entity_1 = require("../databases/message.entity");
const user_service_1 = require("../user/user.service");
const userchat_controller_1 = require("./userchat.controller");
const inbox_service_1 = require("../inbox/inbox.service");
const inbox_user_entity_1 = require("../databases/inbox_user.entity");
const achievement_entity_1 = require("../databases/achievement/achievement.entity");
const stats_entity_1 = require("../databases/stats.entity");
const match_history_entity_1 = require("../databases/match_history.entity");
let ChatGatewayModule = class ChatGatewayModule {
};
exports.ChatGatewayModule = ChatGatewayModule;
exports.ChatGatewayModule = ChatGatewayModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, match_history_entity_1.Match_history, userchat_entity_1.User_chat, message_entity_1.Message, inbox_user_entity_1.Inbox_user, achievement_entity_1.Achievement, stats_entity_1.Stats]),
        ],
        controllers: [userchat_controller_1.chatController],
        providers: [
            userchat_service_1.ChatGatewayService, userchat_gateway_1.ChatGateway,
            jwt_1.JwtService, wsGuard_1.WsGuard, user_service_1.UserService, inbox_service_1.InboxService,
        ]
    })
], ChatGatewayModule);
//# sourceMappingURL=userchat.module.js.map