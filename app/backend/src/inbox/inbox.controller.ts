import { Controller, Get, Param, ParseIntPipe, Post, Headers, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatGatewayService } from 'src/chat/userchat.service';
import { User } from 'src/databases/user.entity';
import { Repository } from 'typeorm';


@Controller('inbox')
export class InboxController {
    constructor(
        private readonly chatService: ChatGatewayService,
        @InjectRepository(User) private userRepository: Repository<User>
    ) {
    }

    @Get('/:id')
    @UseGuards(AuthGuard('jwt'))
    async getUserInbox(@Headers('authorization') req: string, @Param('id', ParseIntPipe) id: number) {
        const userFromToken = this.chatService.isValidAuthHeader(req)
        if (userFromToken === null)
            return 'not authorized';
        const user = await this.chatService.getUserByEmail(userFromToken.email)
        const sender = await  this.chatService.getUserById(id)
        if (sender === null || user === null)
            return 'user does not exist'
        console.log(sender)
        const msg = await this.chatService.getInboxBySenderId(sender.id, user)
        return msg
    }


}
