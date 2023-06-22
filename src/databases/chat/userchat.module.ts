import { Module } from "@nestjs/common";
import { chatGateway } from "./userchat.controller";
import { ChatGatewayService } from "./userchat.service";


@Module({
    controllers: [],
    providers: [ChatGatewayService, chatGateway]
})

export class ChatGatewayModule{}