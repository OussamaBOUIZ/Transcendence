import { Module } from "@nestjs/common";
import { ChatGatewayGateway } from "./chat-gateway.gateway";

@Module({
  imports: [],
  providers: [ChatGatewayGateway]
})
export class GatewayModule {}