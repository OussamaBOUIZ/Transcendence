import { Module } from '@nestjs/common';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/databases/user.entity';
import { Channel } from 'src/databases/channel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Channel])],
  controllers: [ChannelController],
  providers: [ChannelService]
})
export class ChannelModule {}
