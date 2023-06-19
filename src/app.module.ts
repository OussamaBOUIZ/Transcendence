import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achievement } from './databases/achievement.entity';
import { Channel } from './databases/channel.entity';
import { Friend } from './databases/friend.entity';
import { Match_history } from './databases/match_history.entity';
import { Muted_users } from './databases/muted_users.entity';
import { Stats } from './databases/stats.entity';
import { User } from './databases/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ChatGatewayGateway } from './chat-gateway/chat-gateway.gateway';
import { GatewayModule } from './chat-gateway/gateway.module';
import { dataSourceOptions } from './datasource/data-source';

@Module({
  imports: [
    // TypeOrmModule.forRoot([]) 
    TypeOrmModule.forRoot(dataSourceOptions)
  , 
  AuthModule,
  GatewayModule,
  ConfigModule.forRoot({
    isGlobal: true,
  })
],
  providers: [ChatGatewayGateway]
})
export class AppModule {}