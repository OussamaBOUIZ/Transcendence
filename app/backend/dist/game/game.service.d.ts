import { Game } from "src/databases/game.entity";
import { Repository } from "typeorm";
import { UserService } from "src/user/user.service";
import { AchievementService } from "src/databases/achievement/achievement.service";
export declare class gameService {
    private readonly gameRepo;
    private readonly userService;
    private readonly achievementService;
    constructor(gameRepo: Repository<Game>, userService: UserService, achievementService: AchievementService);
}
