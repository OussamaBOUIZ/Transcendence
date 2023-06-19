import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway()
export class ChatGatewayGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world !';
  }
}