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
import { log } from 'console';
import { find } from 'rxjs';

type InboxItem = {
    author: {id:number, username:string},
    lastMessage: string,
    unseenMessages?: number,
    CreatedAt: Date
}
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
        console.log('in function inbox'); CreatedAt: Date;
        
        const user = await this.userService.findUserByEmail(req.user['email'])
        if (user === null)
            return 'Not authorized';


            const inboxes = await this.inboxService.getAllInboxOfUser(user.id)

    
            const userSet = new Set<string>();
            const arrayOfInbox = [] // size 1;
            inboxes.forEach((inbox) => {
                const findThePeer = inboxes.filter((friend) => {
                    return (inbox.user.id === friend.author.id && inbox.author.id === friend.user.id);
                });
                if(findThePeer)
                {
                    const checkId = `${user.id}${findThePeer[0].user.id}`;
                    const reverseCheckId = `${findThePeer[0].user.id}${user.id}`;
                    if(userSet.has(checkId) || userSet.has(reverseCheckId))
                        return ;
                    const latestTimeObj = findThePeer[0].CreatedAt > inbox.CreatedAt ? 
                                                findThePeer[0] : inbox;
                    
                    var result : InboxItem = {
                        author: findThePeer[0].user,
                        lastMessage: latestTimeObj.lastMessage,
                        CreatedAt: latestTimeObj.CreatedAt,
                        unseenMessages: latestTimeObj.unseenMessages,
                    };

                    console.log('result is', result);
                    // arrayOfInbox.push(latestTimeObj);
                }
                // else
                //     arrayOfInbox.push(inbox);
                const userId: string = `${user.id}${findThePeer[0].user.id}`;
                userSet.add(userId);

            });     
        // let inb = await this.inboxService.getAllInboxOfUser(user.id)

        // console.log(inb);
        // return inb
    }
}
/*
{
    const inboxes = ...;
    const arrayOfInbox = [] // size 1;
    inboxes.forEach((inbox) => {
        const findThePeer = inboxes.filter((inbox) => {
            return inbox.userId = inbox.authorId && inbox.authorId = inbox = userId;
        });
        if(findThePeer)
        {
            const latestTimeObj = // compare the time between inbox and findThePeer;
            if(latestTimeObj.id === inbox.id)
                latestTimeObj.username = findThePeer.username;
            arrayOfInbox.push(latestTimeObj);
        }
        else
            arrayOfInbox.push(inbox);
    }); 
}

*/