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
exports.Channel = void 0;
const typeorm_1 = require("typeorm");
const muted_users_entity_1 = require("./muted_users.entity");
const message_entity_1 = require("./message.entity");
const user_entity_1 = require("./user.entity");
let Channel = class Channel extends typeorm_1.BaseEntity {
};
exports.Channel = Channel;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Channel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Channel.prototype, "channel_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Channel.prototype, "channel_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Channel.prototype, "channel_password", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, (user) => user.userRoleChannels, { nullable: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Channel.prototype, "channelUsers", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, (user) => user.adminRoleChannels, { nullable: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Channel.prototype, "channelAdmins", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, (user) => user.ownerRoleChannels, { nullable: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Channel.prototype, "channelOwners", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, (user) => user.userBannedChannels, { nullable: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Channel.prototype, "BannedUsers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.Message, (messages) => messages.channel, { nullable: true }),
    __metadata("design:type", Array)
], Channel.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => muted_users_entity_1.Muted_users, (muted_users) => muted_users.user_id, { nullable: true }),
    __metadata("design:type", Array)
], Channel.prototype, "muted", void 0);
exports.Channel = Channel = __decorate([
    (0, typeorm_1.Entity)('Channel')
], Channel);
//# sourceMappingURL=channel.entity.js.map