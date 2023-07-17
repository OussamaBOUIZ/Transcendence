import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import {Server, Socket} from "socket.io"
import { ChannelService } from "./channel.service";
import { Message } from "src/databases/message.entity";

@WebSocketGateway()
export class ChannelGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() 
        server: Server;

    constructor(private readonly channelservice: ChannelService) {}
    afterInit() {
        console.log(`Init gateway`)
    }

    async handleConnection(client: Socket) {
        const authToken: string = client.handshake.headers.authorization;
        const user = await this.channelservice.getUserFromJwt(authToken);
        user.socketId = client.id;
    }


    handleDisconnect(client: Socket) {
        // console.log(`auth is ${client.handshake.headers.authorization}`);
    }

    @SubscribeMessage('channelMessage')
    messageSend(@MessageBody() newMessage: any, client: Socket, channelName: string)
    {
        const message: Message = new Message();
        
        this.server.emit('sendMessage', {
            msg: 'new message',
            content: message
        });
    }

}
