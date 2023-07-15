import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import {Server, Socket} from "socket.io"

@WebSocketGateway()
export class ChannelGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() 
        server: Server;

    afterInit() {
        console.log(`Init gateway`)
    }

    handleConnection(client: Socket) {
        console.log(`client ${client.id} connected`)
    }


    handleDisconnect(client: Socket) {
        console.log(`client ${client.id} disconnected`)
    }

    @SubscribeMessage('message')
    messageSend(@MessageBody() message: any)
    {
        this.server.emit('onMessage', {
            msg: 'newMessage',
            content: message
        });
    }
}

