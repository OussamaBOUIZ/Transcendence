import {Module} from "@nestjs/common";
import {ChatGateway} from "./userchat.gateway";
import {ChatGatewayService} from "./userchat.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../databases/user.entity";
import {JwtService} from "@nestjs/jwt";
import {WsGuard} from "../auth/socketGuard/wsGuard";
import {User_chat} from "../databases/userchat.entity";
import {Message} from "../databases/message.entity";
import {UserService} from "../user/user.service";
import { chatController } from './userchat.controller';
import {InboxService} from "../inbox/inbox.service";
import {Inbox_user} from "../databases/inbox_user.entity";
import { Achievement } from "src/databases/achievement/achievement.entity";
import {Stats} from "../databases/stats.entity";
import {Match_history} from "../databases/match_history.entity";



@Module({
	imports: [
		TypeOrmModule.forFeature([User, Match_history, User_chat, Message, Inbox_user, Achievement, Stats]),
		// JwtModule.registerAsync({
		// useFactory: async (configService: ConfigService) => ({
		//     global: true,
		//     secret: configService.get('JWT_SECRET'),
		// }),
		// inject: [ConfigService],
		// })
	],
	controllers: [chatController],
	providers: [
		ChatGatewayService, ChatGateway,
		JwtService, WsGuard, UserService, InboxService,
	]
})

export class ChatGatewayModule {
}