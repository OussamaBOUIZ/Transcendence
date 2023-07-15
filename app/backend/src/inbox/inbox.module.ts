import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGatewayService } from 'src/chat/userchat.service';
import { ChatGatewayModule } from 'src/chat/userchat.module';
import { InboxController } from './inbox.controller';
import { InboxService } from './inbox.service';
import {User } from 'src/databases/user.entity'
import { JwtStrategy } from 'src/auth/jwt/jwtStrategy';
import { ChatGateway } from 'src/chat/userchat.gateway';
import { JwtService } from '@nestjs/jwt';
import { WsGuard } from 'src/auth/socketGuard/wsGuard';
import { User_chat } from 'src/databases/userchat/userchat.entity';
import { Message } from 'src/databases/message.entity';
import { Inbox_user } from 'src/databases/inbox/inbox_user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, User_chat, Message, Inbox_user])],
  controllers: [InboxController],
  providers: [InboxService, ChatGatewayService, ChatGateway, JwtService],
})
export class InboxModule {}
