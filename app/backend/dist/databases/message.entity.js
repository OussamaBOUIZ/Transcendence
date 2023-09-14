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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const typeorm_1 = require("typeorm");
const userchat_entity_1 = require("./userchat.entity");
const channel_entity_1 = require("./channel.entity");
let Message = class Message extends typeorm_1.BaseEntity {
};
exports.Message = Message;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Message.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => userchat_entity_1.User_chat, (user_chat) => user_chat.messages, { nullable: true }),
    __metadata("design:type", userchat_entity_1.User_chat)
], Message.prototype, "user_chat", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => channel_entity_1.Channel, (channel) => channel.messages, { nullable: true }),
    __metadata("design:type", channel_entity_1.Channel)
], Message.prototype, "channel", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Message.prototype, "fromUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Message.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Message.prototype, "CreatedAt", void 0);
exports.Message = Message = __decorate([
    (0, typeorm_1.Entity)('Message')
], Message);
//# sourceMappingURL=message.entity.js.map