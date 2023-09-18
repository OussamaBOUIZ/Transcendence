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
exports.Stats = void 0;
const typeorm_1 = require("typeorm");
const achievement_entity_1 = require("./achievement/achievement.entity");
const user_entity_1 = require("./user.entity");
let Stats = class Stats extends typeorm_1.BaseEntity {
};
exports.Stats = Stats;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Stats.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => achievement_entity_1.Achievement, (achievement) => achievement.stat, { nullable: true }),
    __metadata("design:type", Array)
], Stats.prototype, "achievements", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Stats.prototype, "wins", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Stats.prototype, "consecutive_wins", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Stats.prototype, "losses", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.stat),
    __metadata("design:type", user_entity_1.User)
], Stats.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Stats.prototype, "xp", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Stats.prototype, "ladder_level", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Stats.prototype, "levelPercentage", void 0);
exports.Stats = Stats = __decorate([
    (0, typeorm_1.Entity)('Stats')
], Stats);
//# sourceMappingURL=stats.entity.js.map