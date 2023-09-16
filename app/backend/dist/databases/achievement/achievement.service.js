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
exports.AchievementService = void 0;
const common_1 = require("@nestjs/common");
const achievement_entity_1 = require("./achievement.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const stats_entity_1 = require("../stats.entity");
const user_service_1 = require("../../user/user.service");
let AchievementService = class AchievementService {
    constructor(achieveRepo, statRepo, userService) {
        this.achieveRepo = achieveRepo;
        this.statRepo = statRepo;
        this.userService = userService;
    }
    fillAchievements(map) {
        map['Pong member'] = 'became part of our game';
        map['Pong win'] = 'won first game';
        map['Pong veteran'] = 'achieved level 5';
        map['Pong pro'] = 'achieved level 15';
        map['Pong master'] = 'achieved level 25';
        map['the wall'] = '0 shots at own goal';
        map['hot shooter'] = '5 wins in a row';
        map['master shooter'] = '10 wins in a row';
        map['underdog'] = 'beat a player 2 levels higher than you';
        map['Battle Royal winner'] = 'won Battle Royal ground';
        map['Blazing Pong winner'] = 'won Blazing Pong ground';
        map['Arctic Pong winner'] = 'won the Arctic Pong ground';
        map['Retro Pong winner'] = 'won the Retro Pong ground';
        map['the goat'] = 'the best player in the world';
    }
    async createAchievements(user) {
        let map = {};
        this.fillAchievements(map);
        const keys = Object.keys(map);
        const stat = new stats_entity_1.Stats();
        stat.user = user;
        await this.statRepo.save(stat);
        user.stat = stat;
        await this.userService.saveUser(user);
        for (let i = 0; i < 14; i++) {
            const newAchievement = new achievement_entity_1.Achievement();
            newAchievement.badge_name = keys[i];
            newAchievement.description = map[keys[i]];
            if (i === 0)
                newAchievement.is_achieved = true;
            newAchievement.stat = user.stat;
            newAchievement.user_id = user.id;
            await this.achieveRepo.save(newAchievement);
        }
    }
    async unlockAchievement(badge_name, userId) {
        const achievement = await this.achieveRepo.findOne({
            where: {
                badge_name: badge_name,
                user_id: userId
            }
        });
        achievement.is_achieved = true;
        await this.achieveRepo.save(achievement);
    }
    async setUnderdogAchievement(userId) {
        await this.unlockAchievement('underdog', userId);
    }
    async setShooterAchievement(consecutive_wins, userId) {
        switch (consecutive_wins) {
            case 5:
                await this.unlockAchievement('hot shooter', userId);
                break;
            case 10:
                await this.unlockAchievement('master shooter', userId);
                break;
        }
    }
    async setLevelAchievement(oldlevel, level, userId) {
        if (oldlevel === level)
            return;
        switch (level) {
            case 5:
                await this.unlockAchievement('Pong veteran', userId);
                break;
            case 15:
                await this.unlockAchievement('Pong pro', userId);
                break;
            case 25:
                await this.unlockAchievement('Pong master', userId);
                break;
        }
    }
    async setGameAchievement(gameType, userId, wins) {
        if (wins == 0)
            await this.unlockAchievement('Pong win', userId);
        switch (gameType) {
            case 'Battle royal':
                await this.unlockAchievement('Battle royal winner', userId);
                break;
            case 'Blazing Pong':
                await this.unlockAchievement('Blazing Pong winner', userId);
                break;
            case 'Arctic Pong':
                await this.unlockAchievement('Arctic Pong winner', userId);
                break;
            case 'Retro Pong':
                await this.unlockAchievement('Retro Pong winner', userId);
                break;
        }
    }
};
exports.AchievementService = AchievementService;
exports.AchievementService = AchievementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(achievement_entity_1.Achievement)),
    __param(1, (0, typeorm_1.InjectRepository)(stats_entity_1.Stats)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        user_service_1.UserService])
], AchievementService);
//# sourceMappingURL=achievement.service.js.map