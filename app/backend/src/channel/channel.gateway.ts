import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from "@nestjs/websockets";
import {Server, Socket} from "socket.io"
import { ChannelService } from "./channel.service";
import { newUserDto } from "./dto/newUserDto";
import { UserService } from "src/user/user.service";
import { channelMessageDto } from "./dto/channelMessageDto";
import { UserOperationDto } from "./dto/operateUserDto";
import { muteUserDto } from "./dto/muteUserDto";
import { Channel } from "src/databases/channel.entity";
import { channelDto } from "./dto/channelDto";

@WebSocketGateway(1313, {cors: {
	origin: "http://localhost:5173",
    credentials: true
}}) 
export class ChannelGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() 
        server: Server;

    constructor(private readonly channelservice: ChannelService
        , private readonly userService: UserService) {}
    afterInit() {
        console.log(`Init gateway`)
    }
    
    async handleConnection(client: Socket) {
        const cookie = client.handshake.headers.cookie.split('access_token=')[1];
        console.log(`cookie ${cookie}`)
        const user = await this.userService.getUserFromJwt(cookie);
        if(!user)
        {
            client.disconnect();
            throw new WsException('user is not authenticated');
        }
        user.socketId = client.id;
        if(user.userRoleChannels !== null && user.userRoleChannels !== undefined)
            user.userRoleChannels.forEach(channel => client.join(channel.channel_name));
        if(user.adminRoleChannels !== null && user.adminRoleChannels !== undefined)
            user.adminRoleChannels.forEach(channel => client.join(channel.channel_name));
        if(user.ownerRoleChannels !== null && user.ownerRoleChannels !== undefined)
            user.ownerRoleChannels.forEach(channel => client.join(channel.channel_name));
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
        const muted = await this.channelservice.muteUserFromChannel(user, channel);
        if(typeof muted === 'string')
        {
            this.server.emit('exception', 'user already muted');
            return ;
        }
        setTimeout(this.unmuteUser, user.minutes * 60000, user.userId, this.channelservice, this.server);
        this.server.emit('userMuted', `user was muted from channel ${user.channelName}`)
    }

    @SubscribeMessage('accessChannel')
    async createChannel(@MessageBody() channelData: channelDto, @ConnectedSocket() client: Socket)
    {
        client.join(channelData.channelName);
    }

    @SubscribeMessage('banuser')
    async banuser(@MessageBody() user: UserOperationDto, @ConnectedSocket() client: Socket)
    {
        client.leave(user.channelName);
        await this.channelservice.banUserFromChannel(user);
        this.server.emit('userBanned', `user was banned from channel ${user.channelName}`);
    }

    @SubscribeMessage('messageSend')
    messagee(@MessageBody() data) {
        this.server.to(data.channelName).emit('messagee', data);
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
        console.log('HEEEY BRO')
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
        console.log("getting the message")

        if(await this.channelservice.userIsMuted(newMessage.fromUser) === true)
        {
            this.server.emit('userIsMuted', 'user is muted from the channel');
            return ;
        }
        console.log('block1');
        const channel: Channel = await this.channelservice.getChannel(newMessage.channelName);
        console.log('block2');
        await this.channelservice.storeChannelMessage(newMessage.message, channel);
        console.log(newMessage.channelName)
        this.server.to(newMessage.channelName).emit('sendChannelMessage', newMessage);
    }

}

