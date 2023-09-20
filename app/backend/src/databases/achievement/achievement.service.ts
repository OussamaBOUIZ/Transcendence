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
    async unlockAchievement(badge_name: string, userId: number)
    {
        const achievement = await this.achieveRepo.findOne({
            where: {
                badge_name: badge_name,
                user_id: userId
            }
        });
        achievement.is_achieved = true;
        await this.achieveRepo.save(achievement);
    }
    async setUnderdogAchievement(userId: number)
    {
        await this.unlockAchievement('underdog', userId);
    }
    async setShooterAchievement(consecutive_wins: number, userId: number)
    {
        switch (consecutive_wins) {
            case 5:
                await this.unlockAchievement('hot shooter', userId);
                break;
            case 10:
                await this.unlockAchievement('master shooter', userId);
                break;
        }
    }
    async setLevelAchievement(oldlevel: number, level: number, userId: number)
    {
        if(oldlevel === level) return ;
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
    async setGameAchievement(gameType: string, userId: number, wins: number)
    {        
        if(wins == 0)
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
}
