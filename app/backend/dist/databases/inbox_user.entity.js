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
exports.Inbox_user = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let Inbox_user = class Inbox_user extends typeorm_1.BaseEntity {
};
exports.Inbox_user = Inbox_user;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Inbox_user.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.inbox_users),
    __metadata("design:type", user_entity_1.User)
], Inbox_user.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Inbox_user.prototype, "lastMessage", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Inbox_user.prototype, "CreatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Inbox_user.prototype, "unseenMessages", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.inbox_users),
    __metadata("design:type", user_entity_1.User)
], Inbox_user.prototype, "user", void 0);
exports.Inbox_user = Inbox_user = __decorate([
    (0, typeorm_1.Entity)('Inbox_user')
], Inbox_user);
//# sourceMappingURL=inbox_user.entity.js.map