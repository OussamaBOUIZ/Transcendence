import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from 'src/databases/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Achievement } from 'src/databases/achievement/achievement.entity';
import {Stats} from "../databases/stats.entity";
import { BlockedTokenlistService } from 'src/databases/BlockedTokenList/BlockedTokenList.service';
import { BlockedTokenList } from 'src/databases/BlockedTokenList/BlockedTokenList.entity';
import {Match_history} from "../databases/match_history.entity";
import { Game } from 'src/databases/game.entity';
 
@Module({
  imports: [TypeOrmModule.forFeature([User, Achievement, Stats, Match_history, BlockedTokenList, Game])],
  controllers: [UserController],
  providers: [UserService, JwtService, BlockedTokenlistService]
})
export class UserModule {}
