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
import { AuthServiceTs } from './auth.service.ts/auth.service.ts';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5434,
    username: 'postgres',
    password: '123',
    database: 'PingPong', //  PingPong
    entities: [Achievement, Channel,
       Friend, Match_history,
       Muted_users, Stats,
       User
    ],
    synchronize: true,
  })
  , 
  AuthModule,
  ConfigModule.forRoot({
    isGlobal: true,
  })
],
  providers: [AuthServiceTs]
})
export class AppModule {}