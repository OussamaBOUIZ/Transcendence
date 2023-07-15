import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import {Server, Socket} from "socket.io"
import { ChannelService } from "./channel.service";

@WebSocketGateway()
export class ChannelGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() 
        server: Server;

    constructor(private readonly channelservice: ChannelService) {}
    afterInit() {
        console.log(`Init gateway`)
    }

    handleConnection(client: Socket) {
        const authToken: string = client.handshake.headers.authorization;
        const user = this.channelservice.getUserFromJwt(authToken);
        if(!user)
            client.disconnect(true);
        
    }


    handleDisconnect(client: Socket) {
        // console.log(`auth is ${client.handshake.headers.authorization}`);
    }

    @SubscribeMessage('newmessage')
    messageSend(@MessageBody() message: any)
    {
        
        this.server.emit('onMessage', {
            msg: 'new message',
            content: message
        });
    }
}

