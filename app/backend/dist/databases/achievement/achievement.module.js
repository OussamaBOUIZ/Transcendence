"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AchievementModule = void 0;
const common_1 = require("@nestjs/common");
const achievement_service_1 = require("./achievement.service");
const typeorm_1 = require("@nestjs/typeorm");
const achievement_entity_1 = require("./achievement.entity");
const stats_entity_1 = require("../stats.entity");
const user_entity_1 = require("../user.entity");
let AchievementModule = class AchievementModule {
};
exports.AchievementModule = AchievementModule;
exports.AchievementModule = AchievementModule = __decorate([
    (0, common_1.Module)({
        providers: [achievement_service_1.AchievementService],
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, achievement_entity_1.Achievement, stats_entity_1.Stats])]
    })
], AchievementModule);
//# sourceMappingURL=achievement.module.js.map