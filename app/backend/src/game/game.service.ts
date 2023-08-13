import {Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Game } from "src/databases/game.entity";
import { Repository } from "typeorm";
import { userWinDto } from "./dto/userWinDto";
import { UserService } from "src/user/user.service";
import { AchievementService } from "src/databases/achievement/achievement.service";

@Injectable()
export class gameService {
    constructor(@InjectRepository(Game) private readonly gameRepo: Repository<Game>,
    private readonly userService: UserService,
    private readonly achievementService: AchievementService){}

    // async userGameDataUpdate(userWinData: userWinDto)
    // {
    //     await this.achievementService.setGameAchievement(userWinData.gameName);
    //     const user = await this.userService.getAchievement(userWinData.userId);
    //     if(userWinData.opponentLevel >= userWinData.userLevel + 2)
    //         await this.achievementService.setUnderdogAchievement();
    //     const oldLevel = user.stat.ladder_level;
    //     user.stat.xp += userWinData.wonXp;
    //     const newLevel = 0.02 * Math.sqrt(user.stat.xp);
    //     user.stat.ladder_level = Math.floor(newLevel);
    //     user.stat.levelPercentage = (newLevel - user.stat.ladder_level);
    //     await this.achievementService.setLevelAchievement(oldLevel, user.stat.ladder_level);
    //     await this.userService.saveStat(user.stat);
    // }
}
