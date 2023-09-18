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
exports.User_chat = void 0;
const typeorm_1 = require("typeorm");
const message_entity_1 = require("./message.entity");
const user_entity_1 = require("./user.entity");
let User_chat = class User_chat extends typeorm_1.BaseEntity {
};
exports.User_chat = User_chat;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], User_chat.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.user_chat),
    __metadata("design:type", user_entity_1.User)
], User_chat.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], User_chat.prototype, "receiverId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.Message, (messages) => messages.user_chat),
    __metadata("design:type", Array)
], User_chat.prototype, "messages", void 0);
exports.User_chat = User_chat = __decorate([
    (0, typeorm_1.Entity)('User_chat')
], User_chat);
//# sourceMappingURL=userchat.entity.js.map