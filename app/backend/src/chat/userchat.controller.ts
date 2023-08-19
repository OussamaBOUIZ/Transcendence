import {Controller, Get, Headers, Param, ParseIntPipe} from '@nestjs/common';
import {ChatGatewayService} from "./userchat.service";
import {UserService} from "../user/user.service";

@Controller('chat')
export class chatController {
    constructor(
        private chatService: ChatGatewayService,
        private userRepository: UserService
    ) {
    }

    @Get(':id') // receiver id
    async getMessages(
        @Headers('authorization') auth: string,
        @Param('id', ParseIntPipe) id: number,
    ) 
    {
        const user = await this.userRepository.getUserFromJwt(auth)

        if (user === null)
            console.log('todo: handle if the receiver not exist')
        return await this.chatService.loadMessage(user, id)
    }

}
