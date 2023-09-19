"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const channel_service_1 = require("./channel.service");
const user_service_1 = require("../user/user.service");
const channelMessageDto_1 = require("./dto/channelMessageDto");
const operateUserDto_1 = require("./dto/operateUserDto");
const muteUserDto_1 = require("./dto/muteUserDto");
const invitationDto_1 = require("./dto/invitationDto");
const channelAccess_1 = require("./dto/channelAccess");
const common_1 = require("@nestjs/common");
const ws_filter_1 = require("../Filter/ws.filter");
let ChannelGateway = class ChannelGateway {
    constructor(channelservice, userService) {
        this.channelservice = channelservice;
        this.userService = userService;
    }
    afterInit() {
    }
    async handleConnection(client) {
        const AllCookies = client.handshake.headers.cookie;
        if (AllCookies == null)
            return;
        const start = AllCookies.indexOf("access_token=") + 13;
        let end = AllCookies.indexOf(";", start);
        end = end !== -1 ? end : AllCookies.length;
        const accessToken = AllCookies.substring(start, end);
        const user = await this.userService.getUserFromJwt(accessToken);
        if (!user) {
            client.emit('exception', 'user not authenticated');
            client.disconnect();
            return;
        }
        user.socketId = client.id;
        user.status = 'Online';
        await this.userService.saveUser(user);
    }
    async handleDisconnect(client) {
        const AllCookies = client.handshake.headers.cookie;
        if (AllCookies == undefined)
            return;
        const start = AllCookies.indexOf("access_token=") + 13;
        let end = AllCookies.indexOf(";", start);
        end = end !== -1 ? end : AllCookies.length;
        const accessToken = AllCookies.substring(start, end);
        const user = await this.userService.getUserFromJwt(accessToken);
        if (!user) {
            client.emit('exception', 'user not authenticated');
            client.disconnect();
            return;
        }
        user.socketId = client.id;
        user.status = 'Offline';
        await this.userService.saveUser(user);
    }
    async unmuteUser(userId, channelservice, server) {
        channelservice.unmuteUser(userId);
        server.emit('Unmuted', 'user was unmuted');
    }
    async receiveInvitation(invData, client) {
        const guest = await this.userService.findUserById(invData.guestId);
        client.to(guest.socketId).emit('invitation', invData);
    }
    async muteuser(user, client) {
        const channel = await this.channelservice.getChannel(user.channelName);
        const muted = await this.channelservice.muteUserFromChannel(user, channel);
        if (typeof muted === 'string') {
            return;
        }
        setTimeout(this.unmuteUser, user.minutes * 60000, user.userId, this.channelservice, this.server);
        this.server.emit('userMuted', `user was muted from channel ${user.channelName}`);
    }
    async createChannel(channelData, client) {
        const user = await this.userService.findUserWithChannels(channelData.userId);
        const channel = await this.channelservice.findChannelBannedMembers(channelData.channelName);
        if (channel !== null && channel.BannedUsers !== null &&
            channel.BannedUsers.some(user => user.id === channelData.userId)) {
            client.emit('userIsBanned', channelData.channelName);
        }
        else {
            client.join(channelData.channelName);
        }
    }
    async leaveAndRemoveChannel(channelData, client) {
        client.leave(channelData.channelName);
        await this.channelservice.leaveChannel(channelData.channelName, channelData.userId);
    }
    async leavechannel(channelData, client) {
        client.leave(channelData.channelName);
    }
    async banuser(banData, client) {
        const user = await this.userService.findUserById(banData.userId);
        client.to(user.socketId).emit('socketDisconnect', banData.channelName);
        await this.channelservice.banUserFromChannel(banData);
    }
    async kickuser(kickData, client) {
        const user = await this.userService.findUserById(kickData.userId);
        client.to(user.socketId).emit('socketDisconnect', kickData.channelName);
        await this.channelservice.kickUserFromChannel(kickData);
    }
    async messageSend(newMessage, client) {
        console.log("here bro2");
        if (await this.channelservice.userIsMuted(newMessage.fromUser) === true) {
            return;
        }
        if (await this.channelservice.userIsBanned(newMessage.channelName, newMessage.fromUser) === true) {
            client.leave(newMessage.channelName);
            return;
        }
        const channel = await this.channelservice.findChannelWithMembers(newMessage.channelName);
        if (channel.channelUsers !== null && channel.channelUsers.some(user => user.id === newMessage.fromUser)
            || channel.channelAdmins !== null && channel.channelAdmins.some(user => user.id === newMessage.fromUser)
            || channel.channelOwners !== null && channel.channelOwners.some(user => user.id === newMessage.fromUser)) {
            await this.channelservice.storeChannelMessage(newMessage, channel);
            console.log("here bro");
            this.server.to(newMessage.channelName).emit('sendChannelMessage', newMessage);
        }
    }
};
exports.ChannelGateway = ChannelGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChannelGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('receiveInvitation'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [invitationDto_1.invitationDto, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChannelGateway.prototype, "receiveInvitation", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('muteuser'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [muteUserDto_1.muteUserDto, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChannelGateway.prototype, "muteuser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('accessChannel'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [channelAccess_1.channelAccess, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChannelGateway.prototype, "createChannel", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveAndRemoveChannel'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [channelAccess_1.channelAccess, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChannelGateway.prototype, "leaveAndRemoveChannel", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leavechannel'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [channelAccess_1.channelAccess, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChannelGateway.prototype, "leavechannel", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('banuser'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [operateUserDto_1.UserOperationDto, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChannelGateway.prototype, "banuser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('kickuser'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [operateUserDto_1.UserOperationDto, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChannelGateway.prototype, "kickuser", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        transform: true,
    })),
    (0, websockets_1.SubscribeMessage)('channelMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [channelMessageDto_1.channelMessageDto, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChannelGateway.prototype, "messageSend", null);
exports.ChannelGateway = ChannelGateway = __decorate([
    (0, common_1.UseFilters)(ws_filter_1.WsExceptionFilter),
    (0, websockets_1.WebSocketGateway)(1212, { cors: {
            origin: "http://10.13.6.4:5173",
            credentials: true
        } }),
    __metadata("design:paramtypes", [channel_service_1.ChannelService,
        user_service_1.UserService])
], ChannelGateway);
//# sourceMappingURL=channel.gateway.js.map