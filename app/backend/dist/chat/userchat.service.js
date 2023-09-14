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
var ChatGatewayService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGatewayService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../databases/user.entity");
const typeorm_2 = require("typeorm");
const userchat_entity_1 = require("../databases/userchat.entity");
const message_entity_1 = require("../databases/message.entity");
const inbox_service_1 = require("../inbox/inbox.service");
const user_service_1 = require("../user/user.service");
let ChatGatewayService = ChatGatewayService_1 = class ChatGatewayService {
    constructor(jwt, configService, inboxService, userService, userRepository, chatRepository, messageRepository) {
        this.jwt = jwt;
        this.configService = configService;
        this.inboxService = inboxService;
        this.userService = userService;
        this.userRepository = userRepository;
        this.chatRepository = chatRepository;
        this.messageRepository = messageRepository;
        this.logger = new common_1.Logger(ChatGatewayService_1.name);
    }
    getUserFromJwt(authorization) {
        const token = authorization.split(' ')[1];
        return this.jwt.verify(token, {
            secret: this.configService.get('JWT_SECRET')
        });
    }
    async getUserByEmail(email) {
        return await this.userRepository.findOneBy({ email: email });
    }
    async getUserById(Id) {
        return await this.userRepository.findOneBy({ id: Id });
    }
    async saveMessage(dto, reciever, author) {
        const user_chat = new userchat_entity_1.User_chat();
        const msg = new message_entity_1.Message();
        user_chat.receiverId = reciever.id;
        user_chat.author = author;
        await this.chatRepository.save(user_chat);
        msg.message = dto.message;
        msg.CreatedAt = dto.creationTime;
        msg.user_chat = user_chat;
        await this.messageRepository.save(msg);
    }
    async isReceiverInBlocked(userId, receiverId) {
        const blockedUser = await this.userService.getBlockedUsers(userId);
        let isBlocked = false;
        blockedUser.blocked_users.forEach((value) => {
            if (value.id === receiverId) {
                isBlocked = true;
                return;
            }
        });
        return isBlocked;
    }
    async processMessage(socket, messageDto) {
        const receiver = await this.getUserById(messageDto.receiverId);
        const author = await this.userRepository.findOneBy({ email: socket.data.user.email });
        if (!author || !receiver) {
            throw {
                msg: 'Invalid sender or receiver',
                socket: author.socketId
            };
        }
        if (author.id === receiver.id)
            throw {
                msg: 'You cannot send message to your self?',
                socket: author.socketId
            };
        if (await this.isReceiverInBlocked(author.id, receiver.id) === true || await this.isReceiverInBlocked(receiver.id, author.id) == true)
            throw {
                msg: 'the user blocked',
                socket: author.socketId
            };
        await this.saveMessage(messageDto, receiver, author);
        await this.inboxService.saveInbox(receiver, author, messageDto);
        const ss = {
            authorId: author.id,
            socketId: receiver.socketId,
            username: author.username
        };
        return ss;
    }
    async getAllMessages(senderId, receiverId) {
        return await this.chatRepository.find({
            select: {
                author: {
                    id: true
                }
            },
            relations: {
                messages: true,
                author: true
            },
            where: [
                { receiverId: senderId, author: { id: receiverId } },
                { receiverId: receiverId, author: { id: senderId } }
            ],
            order: {
                messages: {
                    CreatedAt: 'ASC'
                }
            }
        });
    }
    async loadMessage(user, receiver) {
        const message = await this.getAllMessages(user.id, receiver);
        const transformedArray = message.map(item => {
            const message = item.messages[0];
            if (!message)
                return;
            return {
                authorId: item.author.id,
                message: message === null || message === void 0 ? void 0 : message.message,
                creaionTime: new Date(message === null || message === void 0 ? void 0 : message.CreatedAt)
            };
        });
        return transformedArray;
    }
};
exports.ChatGatewayService = ChatGatewayService;
exports.ChatGatewayService = ChatGatewayService = ChatGatewayService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(5, (0, typeorm_1.InjectRepository)(userchat_entity_1.User_chat)),
    __param(6, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        inbox_service_1.InboxService,
        user_service_1.UserService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ChatGatewayService);
//# sourceMappingURL=userchat.service.js.map