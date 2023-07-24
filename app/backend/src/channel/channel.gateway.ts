import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from "@nestjs/websockets";
import {Server, Socket} from "socket.io"
import { ChannelService } from "./channel.service";
import { newUserDto } from "./dto/newUserDto";
import { UserService } from "src/user/user.service";
import { channelMessageDto } from "./dto/channelMessageDto";
import { UserOperationDto } from "./dto/operateUserDto";
import { muteUserDto } from "./dto/muteUserDto";
import { Channel } from "src/databases/channel.entity";

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
        await this.userService.saveUser(user);
    }


    handleDisconnect(client: Socket) {
        client.disconnect();
    }

    async unmuteUser(userId: number, channelservice: ChannelService, server: Server)
    {
        channelservice.unmuteUser(userId);
        server.emit('Unmuted', 'user was unmuted');
    }

    @SubscribeMessage('muteuser')
    async muteuser(@MessageBody() user: muteUserDto, @ConnectedSocket() client: Socket)
    {
        const channel = await this.channelservice.getChannel(user.channelName);
        await this.channelservice.muteUserFromChannel(user, channel);
        setTimeout(this.unmuteUser, user.minutes * 60000, user.userId, this.channelservice, this.server);
        this.server.emit('userMuted', `user was muted from channel ${user.channelName}`)
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
        this.server.emit('userKicked', `user was kicked from channel ${user.channelName}`);
    }

    @SubscribeMessage('joinchannel')
    async joinchannel(@MessageBody() newUser: newUserDto, @ConnectedSocket() client: Socket)
    {
        client.join(newUser.channelName);
        let channelFound = await this.channelservice.addToChannel(newUser);
        if(typeof channelFound === 'string')
        {
            this.server.emit('exception', {error: channelFound});
            return ;
        }
        this.server.emit('userJoined', channelFound[0].messages);
    }

    @SubscribeMessage('channelMessage')
    async messageSend(@MessageBody() newMessage: channelMessageDto)
    {
        if(this.channelservice.userIsMuted(newMessage.fromUser))
        {
            this.server.emit('userIsMuted', 'user is muted from the channel');
            return ;
        }
        const channel: Channel = await this.channelservice.getChannel(newMessage.channelName);
        await this.channelservice.storeChannelMessage(newMessage.message, channel);
        this.server.to(newMessage.channelName).emit('sendChannelMessage', {
            msg: 'new message',
            content: newMessage
        });
    }

}

