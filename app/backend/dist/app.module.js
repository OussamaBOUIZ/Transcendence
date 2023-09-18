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
const auth_module_1 = require("./auth/auth.module");
const config_1 = require("@nestjs/config");
const mailer_1 = require("@nestjs-modules/mailer");
const data_source_1 = require("./datasource/data-source");
const user_module_1 = require("./user/user.module");
const inbox_module_1 = require("./inbox/inbox.module");
const channel_module_1 = require("./channel/channel.module");
const userchat_module_1 = require("./chat/userchat.module");
const schedule_1 = require("@nestjs/schedule");
const game_module_1 = require("./game/game.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(data_source_1.dataSourceOptions),
            auth_module_1.AuthModule,
            inbox_module_1.InboxModule,
            channel_module_1.ChannelModule,
            user_module_1.UserModule,
            game_module_1.gameModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            userchat_module_1.ChatGatewayModule,
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: 'smtp-mail.outlook.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: process.env.MAIL_USER,
                        pass: process.env.MAIL_PASS,
                    }
                },
            }),
            schedule_1.ScheduleModule.forRoot(),
        ],
        providers: []
    })
], AppModule);
//# sourceMappingURL=app.module.js.map