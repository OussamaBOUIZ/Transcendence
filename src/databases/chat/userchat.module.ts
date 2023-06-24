import { Module } from "@nestjs/common";
import { chatGateway } from "./userchat.controller";
import { ChatGatewayService } from "./userchat.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../user.entity";
import {AuthModule} from "../../auth/auth.module";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {WsGuard} from "../../auth/socketGuard/wsGuard";


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
    providers: [ChatGatewayService, chatGateway, JwtService, WsGuard]
})

export class ChatGatewayModule{}