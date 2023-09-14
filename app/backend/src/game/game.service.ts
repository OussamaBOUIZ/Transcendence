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

    async userGameDataUpdate(userWinData: userWinDto)
    {
        await this.achievementService.setGameAchievement(userWinData.gameName, userWinData.userId);
        const stat = await this.userService.getStat(userWinData.userId);
        if(userWinData.opponentLevel >= stat.ladder_level + 2)
            await this.achievementService.setUnderdogAchievement(userWinData.userId);
        const oldLevel = stat.ladder_level;
        stat.xp += userWinData.wonXp;
        const newLevel = 0.02 * Math.sqrt(stat.xp);
        stat.ladder_level = Math.floor(newLevel);
        stat.levelPercentage = (newLevel - stat.ladder_level) * 100;
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
