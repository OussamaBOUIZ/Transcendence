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
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  gameModule,
  ChatGatewayModule,
  MailerModule.forRoot({
    transport: {
      host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      }
    },
   }),
   ScheduleModule.forRoot(),
],
  providers: []
})
export class AppModule {}