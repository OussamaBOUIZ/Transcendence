import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { ChannelModule } from './channel/channel.module';
import { dataSourceOptions } from './datasource/data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions), 
  AuthModule,
  ChannelModule,
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  // ChatGatewayModule,
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
],
  providers: []
})
export class AppModule {}