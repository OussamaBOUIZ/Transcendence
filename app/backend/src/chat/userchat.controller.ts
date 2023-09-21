import {
    Controller, Get,
    Headers, NotFoundException, Param,
    ParseIntPipe,
    Req,
    UseGuards
} from '@nestjs/common';
import {ChatGatewayService} from "./userchat.service";
import {UserService} from "../user/user.service";
import { Request } from 'express';
import { JwtGuard } from 'src/auth/jwt/jwtGuard';
import { NotFoundError } from 'rxjs';

@Controller('chat')

@UseGuards(JwtGuard) 
export class chatController {
    constructor(
        private chatService: ChatGatewayService,
        private userRepository: UserService
    ) {
    }

    @Get(':id') // receiver id
    async getMessages(
        @Req() req: Request,
        @Param('id', ParseIntPipe) id: number,
    ) 
    { 
        console.log('id is ', id);
        
        const user = await this.userRepository.findUserById(id)
        console.log(user);
        
        if (!user)
            throw new NotFoundException('user not found')
        return await this.chatService.loadMessage(user, id)
    }

}
