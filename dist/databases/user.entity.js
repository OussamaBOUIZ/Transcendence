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
const stats_entity_1 = require("./stats.entity");
const match_history_entity_1 = require("./match_history.entity");
const friend_entity_1 = require("./friend.entity");
const channel_entity_1 = require("./channel.entity");
let User = exports.User = class User extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "unique_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'path' }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "is_two_factor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => friend_entity_1.Friend),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], User.prototype, "friends", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { array: true }),
    __metadata("design:type", Array)
], User.prototype, "blocked_users", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => channel_entity_1.Channel),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], User.prototype, "joined_channels", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => stats_entity_1.Stats),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", stats_entity_1.Stats)
], User.prototype, "stat", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => match_history_entity_1.Match_history, (match_history) => match_history.user),
    __metadata("design:type", Array)
], User.prototype, "match_history", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('User')
], User);
//# sourceMappingURL=user.entity.js.map