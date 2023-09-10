import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import { gameService } from "./game.service";
import { Game } from "src/databases/game.entity";
import { UserService } from "src/user/user.service";
import { Stats } from "src/databases/stats.entity";
import { User } from "src/databases/user.entity";
import { Achievement } from "src/databases/achievement/achievement.entity";
import { Match_history } from "src/databases/match_history.entity";
import { JwtService } from "@nestjs/jwt";
import { gameController } from "./game.controller";
import { AchievementService } from "src/databases/achievement/achievement.service";
import { GameGateway } from "./game.gateway";


@Module({
    imports: [TypeOrmModule.forFeature([Game, Stats, User, Achievement, Match_history])],
	providers: [GameGateway, gameService, UserService, JwtService, AchievementService],
    controllers: [gameController]
})

export class gameModule {

}  