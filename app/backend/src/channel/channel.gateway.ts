import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import {Server, Socket} from "socket.io"
import { ChannelService } from "./channel.service";
import { Body} from '@nestjs/common';
import { Message } from "src/databases/message.entity";
import { User } from "src/databases/user.entity";
import { Channel } from "src/databases/channel.entity";
import { newUserDto } from "./dto/newUserDto";

@WebSocketGateway()
export class ChannelGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() 
        server: Server;

    constructor(private readonly channelservice: ChannelService) {}
    afterInit() {
        console.log(`Init gateway`)
    }

    async handleConnection(client: Socket) {
        // const authToken: string = client.handshake.headers.authorization;
        // const user = await this.channelservice.getUserFromJwt(authToken);
        // user.socketId = client.id;
    }


    handleDisconnect(client: Socket) {
        // console.log(`auth is ${client.handshake.headers.authorization}`);
    }
    @SubscribeMessage('joinchannel')
    joinchannel(@ConnectedSocket() client: Socket, @Body() channelData: newUserDto)
    {
        client.join(channelData.channelName);
        const message = this.channelservice.addToChannel(channelData);
        console.log(message);
        this.server.emit('joined_channel', {message});
    }

    @SubscribeMessage('channelMessage')
    async messageSend(@MessageBody() newMessage: any, channelName: string)
    {
        this.channelservice.storeChannelMessage(newMessage, channelName);
        this.server.to(channelName).emit('sendChannelMessage', {
            msg: 'new message',
            content: newMessage
        });
    }

}
