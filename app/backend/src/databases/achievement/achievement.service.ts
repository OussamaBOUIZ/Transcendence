import { Injectable } from "@nestjs/common";
import { User } from "../user.entity";
import { Achievement } from "./achievement.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Stats } from "../stats.entity";
import { UserService } from "src/user/user.service";


type myMap = {
    [id: string]: string;
}

@Injectable()
export class AchievementService {
    constructor(@InjectRepository(Achievement) private readonly achieveRepo: Repository<Achievement>
    , @InjectRepository(Stats) private readonly statRepo: Repository<Stats>
    , private readonly userService: UserService) {}
    fillAchievements(map: myMap)
    {
        map['Pong member'] = 'became part of our game';
        map['Pong win'] = 'won first game';
        map['Pong veteran'] = 'achieved level 5'; 
        map['Pong pro'] = 'achieved level 15';
        map['Pong master'] = 'achieved level 25';
        map['clean shot'] = '0 shots at own goal';
        map['hot shooter'] = '5 wins in a row';
        map['master shooter'] = '10 wins in a row';
        map['underdog'] = 'beat a player 2 levels higher than you';
        map['Battle royal winner'] = 'won battle royal ground';
        map['The beast winner'] = 'won the beast ground';
        map['spider winner'] = 'won the spider ground';
        map['bright winner'] = 'won the bright ground';
        map['the goat'] = 'the best player in the world';
    }
    async createAchievements(user: User)
    {
        let map: myMap = {};
        this.fillAchievements(map);
        const keys = Object.keys(map);
        const stat: Stats = new Stats();
        stat.user = user;
        await this.statRepo.save(stat);
        user.stat = stat;
        await this.userService.saveUser(user);
        for(let i = 0; i < 14; i++)
        {
            const newAchievement = new Achievement();
            newAchievement.badge_name = keys[i];
            newAchievement.description = map[keys[i]];
            if(i === 0)
                newAchievement.is_achieved = true;
            newAchievement.stat = user.stat;
            newAchievement.user_id = user.id;
            await this.achieveRepo.save(newAchievement);       
        }
    }
    async unlockAchievement(badge_name: string)
    {
        const achievement = await this.achieveRepo.findOne({
            where: {
                badge_name: badge_name,
            }
        });
        achievement.is_achieved === true;
        await this.achieveRepo.save(achievement);
    }
    async setUnderdogAchievement()
    {
        await this.unlockAchievement('underdog');
    }
    async setLevelAchievement(oldlevel: number, level: number)
    {
        if(oldlevel === level) return ;
        if(level === 5)
            await this.unlockAchievement('Pong veteran');
        else if(level === 15)
            await this.unlockAchievement('Pong pro');
        else if(level === 25)
            await this.unlockAchievement('Pong master');
    }
    async setGameAchievement(gameType: string)
    {
        if(gameType === 'Battle royal')
            await this.unlockAchievement('Battle royal winner');
        else if(gameType === 'The beast')
            await this.unlockAchievement('The beast winner');
        else if(gameType === 'bright')
            await this.unlockAchievement('bright winner');
        else if(gameType === 'spider')
            await this.unlockAchievement('spider winner');
    }
}