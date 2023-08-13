import { Module } from "@nestjs/common";
import { AchievementService } from "./achievement.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Achievement } from "./achievement.entity";
import { Stats } from "../stats.entity";
import {User} from "../user.entity";

@Module ({
    providers: [AchievementService],
    imports: [TypeOrmModule.forFeature([User, Achievement, Stats])]
})

export class AchievementModule {

}
