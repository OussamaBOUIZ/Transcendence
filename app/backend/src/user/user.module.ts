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
import { Game } from 'src/databases/game.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { AchievementService } from 'src/databases/achievement/achievement.service';
 
@Module({
  imports: [TypeOrmModule.forFeature([User, Achievement, Stats, BlockedTokenList, Game])],
  controllers: [UserController],
  providers: [UserService, JwtService, BlockedTokenlistService, AuthService, AchievementService]
})
export class UserModule {}
