import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    Headers,
    Param,
    ParseIntPipe,
    Req,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';

import {AuthGuard} from '@nestjs/passport';
import {InjectRepository} from '@nestjs/typeorm';
import {ChatGatewayService} from 'src/chat/userchat.service';
import {User} from 'src/databases/user.entity';
import {Repository} from 'typeorm';
import {UserService} from "../user/user.service";
import {InboxService} from "./inbox.service";
import { Request } from 'express';


@Controller('inbox')
export class InboxController {
    constructor(
        private readonly chatService: ChatGatewayService,
        private readonly userService: UserService,
        private readonly inboxService: InboxService,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {
    }

    @Get('/all')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(ClassSerializerInterceptor)
    async getUserInbox (
        @Req() req: Request
    ) {
        console.log(req.user)
        const user = await this.userService.findUserByEmail(req.user['email'])
        if (user === null)
            return 'Not authorized';
        // const user = await this.chatService.getUserByEmail(userFromToken.email)
        return await this.inboxService.getAllInboxOfUser(user.id)
    }
}
