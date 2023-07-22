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
import { UserOperationDto } from "./dto/operateUserDto";

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

    @SubscribeMessage('banuser')
    async banuser(@MessageBody() user: UserOperationDto, @ConnectedSocket() client: Socket)
    {
        client.leave(user.channelName);
        await this.channelservice.banUserFromChannel(user);
        this.server.emit('userBanned', `user was banned from channel ${user.channelName}`);
    }

    @SubscribeMessage('kickuser')
    async kickuser(@MessageBody() user: UserOperationDto, @ConnectedSocket() client: Socket)
    {
        client.leave(user.channelName);
        await this.channelservice.kickUserFromChannel(user);
        this.server.emit('userBanned', `user was kicked from channel ${user.channelName}`);
    }

    @SubscribeMessage('joinchannel')
    async joinchannel(@MessageBody() newUser: newUserDto, @ConnectedSocket() client: Socket)
    {
        client.join(newUser.channelName);
        let channelFound = await this.channelservice.addToChannel(newUser);
        if(typeof channelFound === 'string')
        {
            this.server.emit('exception', {error: channelFound});
            return null;
        }
        this.server.emit('userJoined', channelFound[0].messages);
    }

    @SubscribeMessage('channelMessage')
    async messageSend(@MessageBody() newMessage: channelMessageDto)
    {
        await this.channelservice.storeChannelMessage(newMessage.message, newMessage.channelName);
        this.server.to(newMessage.channelName).emit('sendChannelMessage', {
            msg: 'new message',
            content: newMessage
        });
    }

}

