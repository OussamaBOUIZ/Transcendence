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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const inbox_user_entity_1 = require("./inbox_user.entity");
const userchat_entity_1 = require("./userchat.entity");
const match_history_entity_1 = require("./match_history.entity");
const stats_entity_1 = require("./stats.entity");
const class_transformer_1 = require("class-transformer");
const channel_entity_1 = require("./channel.entity");
let User = class User extends typeorm_1.BaseEntity {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "socketId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Offline' }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "firstname", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "lastname", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'path', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "firstLog", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isEmailConfirmed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "is_two_factor", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "two_factor_secret", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "otpPathUrl", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => User, user => user.friends),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], User.prototype, "friends", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => User, user => user.friends),
    __metadata("design:type", Array)
], User.prototype, "friendOf", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(type => User, user => user.blocked_users, { nullable: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], User.prototype, "blocked_users", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => stats_entity_1.Stats, (stats) => stats.user, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", stats_entity_1.Stats)
], User.prototype, "stat", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => match_history_entity_1.Match_history, (match_history) => match_history.user, { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "match_history", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => userchat_entity_1.User_chat, (user_char) => user_char.author),
    __metadata("design:type", Array)
], User.prototype, "user_chat", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => inbox_user_entity_1.Inbox_user, (inbox_user) => inbox_user.user),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], User.prototype, "inbox_users", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => channel_entity_1.Channel, (channel) => channel.channelUsers, { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "userRoleChannels", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => channel_entity_1.Channel, (channel) => channel.channelAdmins, { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "adminRoleChannels", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => channel_entity_1.Channel, (channel) => channel.channelOwners, { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "ownerRoleChannels", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => channel_entity_1.Channel, (channel) => channel.BannedUsers, { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "userBannedChannels", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('User')
], User);
//# sourceMappingURL=user.entity.js.map