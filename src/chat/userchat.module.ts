import { Module } from "@nestjs/common";
import { ChatGateway } from "./userchat.gateway";
import { ChatGatewayService } from "./userchat.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../databases/user.entity";
import {AuthModule} from "../auth/auth.module";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {WsGuard} from "../auth/socketGuard/wsGuard";


@Module({
    imports:[
        TypeOrmModule.forFeature([User]),
        // JwtModule.registerAsync({
        // useFactory: async (configService: ConfigService) => ({
        //     global: true,
        //     secret: configService.get('JWT_SECRET'),
        // }),
        // inject: [ConfigService],
        // })
    ],
    controllers: [],
    providers: [ChatGatewayService, ChatGateway, JwtService, WsGuard]
})

export class ChatGatewayModule{}