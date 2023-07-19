import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from "@nestjs/websockets";
import {Server, Socket} from "socket.io"
import { ChannelService } from "./channel.service";
import { Body} from '@nestjs/common';
import { Message } from "src/databases/message.entity";
import { User } from "src/databases/user.entity";
import { Channel } from "src/databases/channel.entity";
import { newUserDto } from "./dto/newUserDto";
import { UserService } from "src/user/user.service";
import { channelDto } from "./dto/channelDto";
import { channelMessageDto } from "./dto/channelMessageDto";

@WebSocketGateway()
export class ChannelGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() 
        server: Server;

    constructor(private readonly channelservice: ChannelService
        , private readonly userService: UserService) {}
    afterInit() {
        console.log(`Init gateway`)
    }

    async handleConnection(client: Socket) {
        console.log(client.id);
        const authToken: string = client.handshake.headers.authorization;
        const user = await this.userService.getUserFromJwt(authToken);
        if(!user)
        {
            client.disconnect();
            throw new WsException('user is not authenticated');
        }
        user.socketId = client.id;
        this.userService.saveUser(user);
    }


    handleDisconnect(client: Socket) {
        client.disconnect();
    }
    @SubscribeMessage('joinchannel')
    async joinchannel(@MessageBody() newUser: newUserDto, @ConnectedSocket() client: Socket)
    {
        client.join(newUser.channelName);
        const message = await this.channelservice.addToChannel(newUser);
        if(message === null)
        {
            this.server.emit('exception', {error: 'user did not provide password in a protected channel'});
            return null;
        }
        for(let a = 0; a < message.length; a++)
        {
            console.log(message[a].messages);
        }
        // this.server.emit('joined_channel', {message});
    }

    @SubscribeMessage('channelMessage')
    async messageSend(@MessageBody() newMessage: channelMessageDto)
    {
        console.log(newMessage.message)
        console.log(newMessage.channelName)
        await this.channelservice.storeChannelMessage(newMessage.message, newMessage.channelName);
        // this.server.to(newMessage.channelName).emit('sendChannelMessage', {
        //     msg: 'new message',
        //     content: newMessage
        // });
    }

}

