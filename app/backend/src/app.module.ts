import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
// import { ChannelModule } from './channel/channel.module';
import { dataSourceOptions } from './datasource/data-source';
import { UserModule } from './user/user.module';
import { InboxModule } from './inbox/inbox.module';
import { ChannelModule } from './channel/channel.module';
import { ChatGatewayModule } from './chat/userchat.module';
import {ScheduleModule} from '@nestjs/schedule'
import { gameModule } from './game/game.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions), 
  AuthModule,
  InboxModule,
  ChannelModule,
  UserModule,
  gameModule,
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: "Transcendence/app/backend/.env"
  }),
  ChatGatewayModule,
   ScheduleModule.forRoot(),
],
  providers: []
})
export class AppModule {}