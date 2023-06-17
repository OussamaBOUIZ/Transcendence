"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const achievement_entity_1 = require("./databases/achievement.entity");
const channel_entity_1 = require("./databases/channel.entity");
const friend_entity_1 = require("./databases/friend.entity");
const match_history_entity_1 = require("./databases/match_history.entity");
const muted_users_entity_1 = require("./databases/muted_users.entity");
const stats_entity_1 = require("./databases/stats.entity");
const user_entity_1 = require("./databases/user.entity");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5434,
                username: 'postgres',
                password: '123',
                database: 'PingPong',
                entities: [achievement_entity_1.Achievement, channel_entity_1.Channel,
                    friend_entity_1.Friend, match_history_entity_1.Match_history,
                    muted_users_entity_1.Muted_users, stats_entity_1.Stats,
                    user_entity_1.User
                ],
                synchronize: true,
            })
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map