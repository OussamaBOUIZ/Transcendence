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
exports.gameService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const game_entity_1 = require("../databases/game.entity");
const typeorm_2 = require("typeorm");
const user_service_1 = require("../user/user.service");
const achievement_service_1 = require("../databases/achievement/achievement.service");
let gameService = class gameService {
    constructor(gameRepo, userService, achievementService) {
        this.gameRepo = gameRepo;
        this.userService = userService;
        this.achievementService = achievementService;
    }
    async userGameDataUpdate(userWinData) {
        await this.achievementService.setGameAchievement(userWinData.gameName, userWinData.userId);
        const stat = await this.userService.getStat(userWinData.userId);
        if (userWinData.opponentLevel >= stat.ladder_level + 2)
            await this.achievementService.setUnderdogAchievement(userWinData.userId);
        const oldLevel = stat.ladder_level;
        stat.xp += userWinData.wonXp;
        const newLevel = 0.02 * Math.sqrt(stat.xp);
        stat.ladder_level = Math.floor(newLevel);
        stat.levelPercentage = (newLevel - stat.ladder_level) * 100;
        await this.achievementService.setLevelAchievement(oldLevel, stat.ladder_level, userWinData.userId);
        await this.userService.saveStat(stat);
    }
    async saveScore(scoreData) {
        const user1 = await this.userService.findUserById(scoreData.userId);
        const user2 = await this.userService.findUserById(scoreData.opponentId);
        const game = new game_entity_1.Game();
        game.user1 = user1;
        game.user2 = user2;
        game.userShots = scoreData.userScore;
        game.opponentShots = scoreData.opponentScore;
        await this.gameRepo.save(game);
    }
};
exports.gameService = gameService;
exports.gameService = gameService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(game_entity_1.Game)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService,
        achievement_service_1.AchievementService])
], gameService);
//# sourceMappingURL=game.service.js.map