import { Module } from '@nestjs/common';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/databases/user.entity';
import { Channel } from 'src/databases/channel.entity';
import { ChannelGateway } from './channel.gateway';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Channel])],
  controllers: [ChannelController],
  providers: [ChannelService, ChannelGateway, JwtService, UserService]
})
export class ChannelModule {}
