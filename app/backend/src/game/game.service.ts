import {Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Game } from "src/databases/game.entity";
import { Repository } from "typeorm";
import { UserService } from "src/user/user.service";
import { AchievementService } from "src/databases/achievement/achievement.service";
import { userWinDto } from "./dto/userWinDto";
import { scoreStoreDto } from "./dto/scoreSavingDto";

@Injectable()
export class gameService {
    constructor(@InjectRepository(Game) private readonly gameRepo: Repository<Game>,
    private readonly userService: UserService,
    private readonly achievementService: AchievementService){}


    async addLoserStat(userId: number) {

        const stat = await this.userService.getStat(userId);
        stat.losses += 1;
        stat.consecutive_wins = 0;
        await this.userService.saveStat(stat);
    }

    async userGameDataUpdate(userWinData: userWinDto)
    {
        const stat = await this.userService.getStat(userWinData.userId);
        await this.achievementService.setGameAchievement(userWinData.gameName, userWinData.userId, stat.wins);
        if(userWinData.opponentLevel >= stat.ladder_level + 2)
            await this.achievementService.setUnderdogAchievement(userWinData.userId);
        const oldLevel = stat.ladder_level;
        stat.xp += userWinData.wonXp;
        stat.wins += 1;
        stat.consecutive_wins += 1;
        await this.achievementService.setShooterAchievement(stat.consecutive_wins, userWinData.userId);
        const newLevel = 0.02 * Math.sqrt(stat.xp);
        stat.ladder_level = Math.floor(newLevel);
        stat.levelPercentage = Math.round((newLevel - stat.ladder_level) * 100);
        await this.achievementService.setLevelAchievement(oldLevel, stat.ladder_level, userWinData.userId);
        await this.userService.saveStat(stat);
    }

    async saveScore(scoreData: scoreStoreDto) {
        const game = new Game();
        game.user1 = scoreData.userId;
        game.user2 = scoreData.opponentId;
        game.userShots = scoreData.userScore;
        game.opponentShots = scoreData.opponentScore;
        await this.gameRepo.save(game);
    }
}