import { Module } from '@nestjs/common';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/databases/user.entity';
import { Channel } from 'src/databases/channel.entity';
import { ChannelGateway } from './channel.gateway';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Message } from 'src/databases/message.entity';
import { Muted_users } from 'src/databases/muted_users.entity';
import { Achievement } from 'src/databases/achievement/achievement.entity';
import {Stats} from "../databases/stats.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Channel, Message, Muted_users, Achievement, Stats])],
  controllers: [ChannelController],
  providers: [ChannelService, ChannelGateway, JwtService, UserService]
})
export class ChannelModule {}
