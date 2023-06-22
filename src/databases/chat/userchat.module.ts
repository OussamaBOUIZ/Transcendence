import { Module } from "@nestjs/common";
import { chatGateway } from "./userchat.controller";
import { ChatGatewayService } from "./userchat.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../user.entity";
import {AuthModule} from "../../auth/auth.module";
import {AuthService} from "../../auth/auth.service";
import {JwtStrategy} from "../../auth/jwt/jwtStrategy";


@Module({
    imports:[TypeOrmModule.forFeature([User])],
    controllers: [],
    providers: [ChatGatewayService, chatGateway, AuthService, JwtStrategy]
})

export class ChatGatewayModule{}