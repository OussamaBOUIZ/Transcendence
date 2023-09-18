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
exports.InboxController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const userchat_service_1 = require("../chat/userchat.service");
const user_entity_1 = require("../databases/user.entity");
const typeorm_2 = require("typeorm");
const user_service_1 = require("../user/user.service");
const inbox_service_1 = require("./inbox.service");
let InboxController = class InboxController {
    constructor(chatService, userService, inboxService, userRepository) {
        this.chatService = chatService;
        this.userService = userService;
        this.inboxService = inboxService;
        this.userRepository = userRepository;
    }
    storeResult(author, lastMessage, unseenMessages, CreatedAt) {
        return {
            author: author,
            lastMessage: lastMessage,
            unseenMessages: unseenMessages,
            CreatedAt: CreatedAt,
        };
    }
    async getUserInbox(req) {
        const user = await this.userService.getUserFromJwt(req.cookies['access_token']);
        if (user === null)
            return 'Not authorized';
        const inboxes = await this.inboxService.getAllInboxOfUser(user.id);
        const userSet = new Set();
        var arrayOfInbox = [];
        inboxes.forEach((inbox) => {
            let result;
            const findThePeer = inboxes.filter((friend) => {
                return (inbox.user.id === friend.author.id && inbox.author.id === friend.user.id);
            });
            if (findThePeer.length !== 0) {
                if (findThePeer[0].user.id !== user.id) {
                    const checkId = `${user.id}${findThePeer[0].user.id}`;
                    const reverseCheckId = `${findThePeer[0].user.id}${user.id}`;
                    if (userSet.has(checkId) || userSet.has(reverseCheckId))
                        return;
                    const userId = `${user.id}${findThePeer[0].user.id}`;
                    userSet.add(userId);
                }
                else {
                    const checkId = `${user.id}${findThePeer[0].author.id}`;
                    const reverseCheckId = `${findThePeer[0].author.id}${user.id}`;
                    if (userSet.has(checkId) || userSet.has(reverseCheckId))
                        return;
                    const userId = `${user.id}${findThePeer[0].author.id}`;
                    userSet.add(userId);
                }
                const latestTimeObj = findThePeer[0].CreatedAt > inbox.CreatedAt ? findThePeer[0] : inbox;
                if (inbox.author.id === user.id)
                    result = this.storeResult(findThePeer[0].author, latestTimeObj.lastMessage, findThePeer[0].unseenMessages, latestTimeObj.CreatedAt);
                else
                    result = this.storeResult(inbox.author, latestTimeObj.lastMessage, inbox.unseenMessages, latestTimeObj.CreatedAt);
                arrayOfInbox.push(result);
            }
            else {
                if (inbox.author.id === user.id) {
                    result = {
                        author: inbox.user,
                        lastMessage: inbox.lastMessage,
                        CreatedAt: inbox.CreatedAt,
                        unseenMessages: 0,
                    };
                }
                else {
                    result = {
                        author: inbox.author,
                        lastMessage: inbox.lastMessage,
                        CreatedAt: inbox.CreatedAt,
                        unseenMessages: inbox.unseenMessages,
                    };
                }
                arrayOfInbox.push(result);
            }
        });
        return arrayOfInbox;
    }
};
exports.InboxController = InboxController;
__decorate([
    (0, common_1.Get)('/all'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InboxController.prototype, "getUserInbox", null);
exports.InboxController = InboxController = __decorate([
    (0, common_1.Controller)('inbox'),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [userchat_service_1.ChatGatewayService,
        user_service_1.UserService,
        inbox_service_1.InboxService,
        typeorm_2.Repository])
], InboxController);
//# sourceMappingURL=inbox.controller.js.map