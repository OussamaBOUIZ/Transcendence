import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlockedTokenlistService } from "./BlockedTokenList.service";
import { BlockedTokenList } from "./BlockedTokenList.entity";

@Module ({
    providers: [BlockedTokenlistService],
    imports: [TypeOrmModule.forFeature([BlockedTokenList])]
})

export class AchievementModule {

}
