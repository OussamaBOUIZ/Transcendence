import {Controller, Get, Header, Headers, Param, ParseIntPipe, Req} from '@nestjs/common';
import {ChatGatewayService} from "./userchat.service";
import {UserService} from "../user/user.service";

@Controller('Chat')
export class chatController {
    constructor(
        private chatService: ChatGatewayService,
        private userRepository: UserService
    ) {
    }

    @Get(':id')
    async getMessages(
        @Headers('authorization') auth: string,
        @Param('id', ParseIntPipe) id: number,
    ) {
        const user = await this.userRepository.getUserFromJwt(auth)
        // const receiver = await this.chatService.getUserById(data.user.userId)
        // if (receiver === null)
        //     console.log('todo: handle if the receiver not exist')
        //
        // )
        if (user === null)
            console.log('todo: handle if the receiver not exist')
        return await this.chatService.loadMessage(user, id)
        // return this.chatService.loadMessage()
    }

}
