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
exports.InboxService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const inbox_user_entity_1 = require("../databases/inbox_user.entity");
let InboxService = class InboxService {
    constructor(inboxRepository) {
        this.inboxRepository = inboxRepository;
    }
    async getUserInboxByunseenMessage(user) {
        return await this.inboxRepository.findAndCount({
            relations: { user: true },
            select: ["unseenMessages"],
            where: {
                user: { id: user.id },
                unseenMessages: (0, typeorm_1.MoreThan)(0),
            }
        });
    }
    async saveInbox(receiver, author, msgDto) {
        let inbox;
        inbox = await this.getInboxBySenderId(author, receiver);
        if (!inbox) {
            console.log('new inbox');
            inbox = new inbox_user_entity_1.Inbox_user();
            inbox.author = author;
            inbox.lastMessage = msgDto.message;
            inbox.CreatedAt = msgDto.creationTime;
            inbox.user = receiver;
            inbox.unseenMessages = 0;
        }
        else {
            inbox.lastMessage = msgDto.message;
            inbox.CreatedAt = msgDto.creationTime;
        }
        if (receiver.isActive !== true)
            inbox.unseenMessages += 1;
        console.log(inbox);
        await this.inboxRepository.save(inbox);
    }
    async getInboxBySenderId(author, receiver) {
        return await this.inboxRepository.findOne({
            relations: {
                user: true,
                author: true
            },
            where: {
                author: {
                    id: author.id
                },
                user: {
                    id: receiver.id
                }
            }
        });
    }
    async getAllInboxOfUser(authorId) {
        console.log(authorId);
        return await this.inboxRepository.find({
            relations: {
                user: true,
                author: true
            },
            where: [
                { author: { id: authorId } },
                { user: { id: authorId } },
            ],
            order: {
                CreatedAt: 'DESC'
            },
            select: {
                user: {
                    id: true,
                    username: true,
                },
                author: {
                    id: true,
                    username: true,
                }
            }
        });
    }
    async updateInbox(inbox) {
        await this.inboxRepository.save(inbox);
    }
};
exports.InboxService = InboxService;
exports.InboxService = InboxService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(inbox_user_entity_1.Inbox_user)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], InboxService);
//# sourceMappingURL=inbox.service.js.map