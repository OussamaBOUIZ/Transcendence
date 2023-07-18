import {Module} from "@nestjs/common";
import {ChatGateway} from "./userchat.gateway";
import {ChatGatewayService} from "./userchat.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../databases/user.entity";
import {JwtService} from "@nestjs/jwt";
import {WsGuard} from "../auth/socketGuard/wsGuard";
import {User_chat} from "../databases/userchat.entity";
import {Message} from "../databases/message.entity";


@Module({
	imports: [
		TypeOrmModule.forFeature([User, User_chat, Message]),
		// JwtModule.registerAsync({
		// useFactory: async (configService: ConfigService) => ({
		//     global: true,
		//     secret: configService.get('JWT_SECRET'),
		// }),
		// inject: [ConfigService],
		// })
	],
	controllers: [],
	providers: [
		ChatGatewayService, ChatGateway,
		JwtService, WsGuard,
	]
})

export class ChatGatewayModule {
}