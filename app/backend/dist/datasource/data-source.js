"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const user_entity_1 = require("../databases/user.entity");
const typeorm_1 = require("typeorm");
const inbox_user_entity_1 = require("../databases/inbox_user.entity");
const userchat_entity_1 = require("../databases/userchat.entity");
const message_entity_1 = require("../databases/message.entity");
const achievement_entity_1 = require("../databases/achievement/achievement.entity");
const channel_entity_1 = require("../databases/channel.entity");
const match_history_entity_1 = require("../databases/match_history.entity");
const stats_entity_1 = require("../databases/stats.entity");
const muted_users_entity_1 = require("../databases/muted_users.entity");
const BlockedTokenList_entity_1 = require("../databases/BlockedTokenList/BlockedTokenList.entity");
exports.dataSourceOptions = {
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'postgres',
    password: '123',
    database: 'PingPong',
    entities: [
        achievement_entity_1.Achievement, channel_entity_1.Channel,
        match_history_entity_1.Match_history,
        muted_users_entity_1.Muted_users,
        stats_entity_1.Stats,
        user_entity_1.User, inbox_user_entity_1.Inbox_user,
        userchat_entity_1.User_chat, message_entity_1.Message,
        BlockedTokenList_entity_1.BlockedTokenList
    ],
    synchronize: true,
};
new typeorm_1.DataSource(exports.dataSourceOptions);
//# sourceMappingURL=data-source.js.map