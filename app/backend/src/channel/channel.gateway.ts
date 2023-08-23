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
import { channelAccess } from "./dto/channelAccess";
import { access } from "fs";

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
        console.log(client.handshake.headers.cookie)
        const AllCookies = client.handshake.headers.cookie;
        const start = AllCookies.indexOf("access_token=") + 13; // 13 is the length of "access_token="
        let end = AllCookies.indexOf(";", start);
        end = end !== -1 ? end : AllCookies.length;
        const accessToken = AllCookies.substring(start, end);
        const user = await this.userService.getUserFromJwt(accessToken);
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
    async createChannel(@MessageBody() channelData: channelAccess, @ConnectedSocket() client: Socket)
    {
        const user = await this.userService.findUserWithChannels(channelData.userId);
        const channel = await this.channelservice.findChannelBannedMembers(channelData.channelName);

        if(channel !== null && channel.BannedUsers !== null && 
            channel.BannedUsers.some(user => user.id === channelData.userId))
        {
            console.log('HEERE', channelData.userId);
            this.server.emit('userIsBanned', 'You are banned from this channel');
        }
        else
            client.join(channelData.channelName);
    }

    @SubscribeMessage('leavechannel')
    async leavechannel(@MessageBody() channelData: channelAccess, @ConnectedSocket() client: Socket)
    {
        client.leave(channelData.channelName);
    }

    @SubscribeMessage('banuser')
    async banuser(@MessageBody() banData: UserOperationDto, @ConnectedSocket() client: Socket)
    {
        const user = await this.userService.findUserById(banData.userId);
        client.to(user.socketId).emit('socketDisconnect', banData.channelName);
        await this.channelservice.banUserFromChannel(banData);
    }

    @SubscribeMessage('kickuser')
    async kickuser(@MessageBody() kickData: UserOperationDto, @ConnectedSocket() client: Socket)
    {
        const user = await this.userService.findUserById(kickData.userId);
        client.to(user.socketId).emit('socketDisconnect', kickData.channelName);
        await this.channelservice.kickUserFromChannel(kickData);
    }

    @SubscribeMessage('joinchannel')
    async joinchannel(@MessageBody() newUser: newUserDto, @ConnectedSocket() client: Socket)
    {
        console.log('id:', newUser.channelNewUser)
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
    async messageSend(@MessageBody() newMessage: channelMessageDto, @ConnectedSocket() client: Socket)
    { 
        if(await this.channelservice.userIsMuted(newMessage.fromUser) === true)
        {
            console.log('HEY1')
            return;
        }
        if(await this.channelservice.userIsBanned(newMessage.channelName, newMessage.fromUser) === true)
        {
            console.log('HEY2')
            client.leave(newMessage.channelName);
            return ;
        }
        const channel: Channel = await this.channelservice.findChannelWithMembers(newMessage.channelName);
        if(channel.channelUsers !== null && channel.channelUsers.some(user => user.id === newMessage.fromUser)
    || channel.channelAdmins !== null && channel.channelAdmins.some(user => user.id === newMessage.fromUser)
    || channel.channelOwners !== null && channel.channelOwners.some(user => user.id === newMessage.fromUser))
        {

            await this.channelservice.storeChannelMessage(newMessage.message, channel);
            this.server.to(newMessage.channelName).emit('sendChannelMessage', newMessage);
        }
    }

}
