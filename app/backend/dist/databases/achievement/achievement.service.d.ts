import { User } from "../user.entity";
import { Achievement } from "./achievement.entity";
import { Repository } from "typeorm";
import { Stats } from "../stats.entity";
import { UserService } from "src/user/user.service";
type myMap = {
    [id: string]: string;
};
export declare class AchievementService {
    private readonly achieveRepo;
    private readonly statRepo;
    private readonly userService;
    constructor(achieveRepo: Repository<Achievement>, statRepo: Repository<Stats>, userService: UserService);
    fillAchievements(map: myMap): void;
    createAchievements(user: User): Promise<void>;
    unlockAchievement(badge_name: string, userId: number): Promise<void>;
    setUnderdogAchievement(userId: number): Promise<void>;
    setLevelAchievement(oldlevel: number, level: number, userId: number): Promise<void>;
    setGameAchievement(gameType: string, userId: number): Promise<void>;
}
export {};
