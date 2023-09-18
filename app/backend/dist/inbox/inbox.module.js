"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InboxModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const userchat_service_1 = require("../chat/userchat.service");
const inbox_controller_1 = require("./inbox.controller");
const inbox_service_1 = require("./inbox.service");
const user_entity_1 = require("../databases/user.entity");
const jwt_1 = require("@nestjs/jwt");
const userchat_entity_1 = require("../databases/userchat.entity");
const message_entity_1 = require("../databases/message.entity");
const inbox_user_entity_1 = require("../databases/inbox_user.entity");
const core_1 = require("@nestjs/core");
const user_service_1 = require("../user/user.service");
const achievement_entity_1 = require("../databases/achievement/achievement.entity");
const stats_entity_1 = require("../databases/stats.entity");
const match_history_entity_1 = require("../databases/match_history.entity");
const game_entity_1 = require("../databases/game.entity");
let InboxModule = class InboxModule {
};
exports.InboxModule = InboxModule;
exports.InboxModule = InboxModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, userchat_entity_1.User_chat, message_entity_1.Message, inbox_user_entity_1.Inbox_user, achievement_entity_1.Achievement, stats_entity_1.Stats, match_history_entity_1.Match_history, game_entity_1.Game])],
        controllers: [inbox_controller_1.InboxController],
        providers: [
            inbox_service_1.InboxService, userchat_service_1.ChatGatewayService, jwt_1.JwtService,
            {
                provide: core_1.APP_PIPE,
                useClass: common_1.ValidationPipe,
            },
            user_service_1.UserService
        ],
    })
], InboxModule);
//# sourceMappingURL=inbox.module.js.map