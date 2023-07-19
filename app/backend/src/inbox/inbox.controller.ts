import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    Headers,
    Param,
    ParseIntPipe,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';

import {AuthGuard} from '@nestjs/passport';
import {InjectRepository} from '@nestjs/typeorm';
import {ChatGatewayService} from 'src/chat/userchat.service';
import {User} from 'src/databases/user.entity';
import {Repository} from 'typeorm';
import {classToPlain, serialize} from "class-transformer";
import {UserService} from "../user/user.service";
import {InboxService} from "./inbox.service";


@Controller('inbox')
export class InboxController {
    constructor(
        private readonly chatService: ChatGatewayService,
        private readonly userService: UserService,
        private readonly inboxService: InboxService,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {
    }

    @Get('/:id')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(ClassSerializerInterceptor)
    async getUserInbox (
        @Headers('authorization') req: string,
        @Param('id', ParseIntPipe) id: number,
    ) {
        const user = await this.userService.getUserFromJwt(req)
        if (user === null)
            return 'Not authorized';
        // const user = await this.chatService.getUserByEmail(userFromToken.email)
        const author = await this.chatService.getUserById(id)
        if (author === null)
            return 'user does not exist'
        console.log(user)
        return await this.inboxService.getInboxBySenderId(author.id, user)
    }
}
