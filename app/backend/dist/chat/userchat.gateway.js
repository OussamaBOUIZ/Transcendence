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
var ChatGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const userchat_service_1 = require("./userchat.service");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../databases/user.entity");
const common_1 = require("@nestjs/common");
const websocket_middleware_1 = require("./websocket.middleware");
const interfaces_1 = require("../interfaces/interfaces");
const inbox_service_1 = require("../inbox/inbox.service");
const user_service_1 = require("../user/user.service");
const ws_filter_1 = require("../Filter/ws.filter");
let ChatGateway = ChatGateway_1 = class ChatGateway {
    constructor(userRepository, chatGatewayService, inboxService, userService, configService) {
        this.userRepository = userRepository;
        this.chatGatewayService = chatGatewayService;
        this.inboxService = inboxService;
        this.userService = userService;
        this.configService = configService;
        this.logger = new common_1.Logger(ChatGateway_1.name);
    }
    async sendMessage(socket, messageDto) {
        var data;
        try {
            data = await this.chatGatewayService.processMessage(socket, messageDto);
            this.server.to(data.socketId).emit("message", messageDto);
        }
        catch (e) {
            this.server.to(e.socket).emit('error', e.msg);
            return;
        }
    }
    async updateUnseenMessage(socket, peerDto) {
        const userEmail = socket.data.user.email;
        const user = await this.userService.findUserByEmail(userEmail);
        const peer = await this.userService.findUserById(peerDto);
        if (!user || !peer) {
            const message = !user ? 'The user not exist' : 'The Peer not exist';
            throw new websockets_1.WsException(message);
        }
        const inbox = await this.inboxService.getInboxBySenderId(peer, user);
        this.logger.log({ inbox });
        if (!inbox)
            throw new websockets_1.WsException('there is no prior conversation !');
        inbox.unseenMessages += 1;
        this.logger.log('here in update', inbox.unseenMessages);
        await this.inboxService.updateInbox(inbox);
    }
    async resetUnseenMessage(socket, peerDto) {
        const userEmail = socket.data.user.email;
        const user = await this.userService.findUserByEmail(userEmail);
        const peer = await this.userService.findUserById(peerDto);
        if (!user || !peer) {
            const message = !user ? 'The user not exist' : 'The Peer not exist';
            throw new websockets_1.WsException(message);
        }
        const inbox = await this.inboxService.getInboxBySenderId(peer, user);
        if (!inbox)
            throw new websockets_1.WsException('there is no prior conversation !');
        inbox.unseenMessages = 0;
        await this.inboxService.updateInbox(inbox);
    }
    async onUpdateInbox(socket, payload) {
        const author = await this.userService.findUserById(payload);
        const receiver = socket.data.user.email;
        const inbox = await this.inboxService.getInboxBySenderId(author, receiver);
        this.server.to(socket.id).emit('updateInbox', inbox);
    }
    async afterInit(client) {
        client.use((0, websocket_middleware_1.SocketAuthMiddleware)(this.userService));
    }
    async handleConnection(client) {
        let user;
        user = await this.userRepository.findOneBy({ email: client.data.user.email });
        if (!user)
            throw new websockets_1.WsException("the user not found");
        user.socketId = client.id;
        user.isActive = true;
        await this.userRepository.save(user);
    }
    async handleDisconnect(client) {
        const user = await this.chatGatewayService.getUserByEmail(client.data.user.email);
        if (!user)
            throw new websockets_1.WsException("the user not found");
        user.isActive = false;
        await this.userRepository.save(user);
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        transform: true,
    })),
    (0, websockets_1.SubscribeMessage)('SendMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, interfaces_1.MessageDto]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "sendMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('updateUnseenMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "updateUnseenMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('messageSeen'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "resetUnseenMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('updateInbox'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onUpdateInbox", null);
exports.ChatGateway = ChatGateway = ChatGateway_1 = __decorate([
    (0, common_1.UseFilters)(ws_filter_1.WsExceptionFilter),
    (0, websockets_1.WebSocketGateway)(4000, { cors: {
            origin: "http://localhost:5173",
            credentials: true
        } }),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        userchat_service_1.ChatGatewayService,
        inbox_service_1.InboxService,
        user_service_1.UserService,
        config_1.ConfigService])
], ChatGateway);
//# sourceMappingURL=userchat.gateway.js.map