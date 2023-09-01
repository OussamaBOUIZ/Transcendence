import {ClassSerializerInterceptor, Controller, Get, Inject, Req, UseGuards, UseInterceptors} from '@nestjs/common';

import {AuthGuard} from '@nestjs/passport';
import {InjectRepository} from '@nestjs/typeorm';
import {ChatGatewayService} from 'src/chat/userchat.service';
import {User} from 'src/databases/user.entity';
import {Repository} from 'typeorm';
import {UserService} from "../user/user.service";
import {InboxService} from "./inbox.service";
import {Request} from 'express';
import {find} from "rxjs";
import {ChatGateway} from "../chat/userchat.gateway";

type InboxItem = {
    author: { id: number, username: string },
    lastMessage: string,
    unseenMessages?: number,
    CreatedAt: Date
}

@Controller('inbox')
export class InboxController {
    constructor(
        // @Inject('ChatGateway') private  readonly chatGateway: ChatGateway,
        private readonly chatService: ChatGatewayService,
        private readonly userService: UserService,
        private readonly inboxService: InboxService,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {
    }

    storeResult(author: User, lastMessage: string,
                unseenMessages: number, CreatedAt: Date) : InboxItem
    {
        return {
            author: author,
            lastMessage: lastMessage,
            unseenMessages: unseenMessages,
            CreatedAt: CreatedAt,

        }
    }

    @Get('/all')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(ClassSerializerInterceptor)
    async getUserInbox(
        @Req() req: Request
    ) {
        console.log('in function inbox')

        const user = await this.userService.findUserByEmail(req.user['email'])
        if (user === null)
            return 'Not authorized';
        const inboxes = await this.inboxService.getAllInboxOfUser(user.id)
        const userSet = new Set<string>();
        var arrayOfInbox: InboxItem[] = []; // size 1;
        inboxes.forEach((inbox) => {
            let result: InboxItem;
            // console.log('DATA IS ', inbox.user.id, inbox.author.id);
            const findThePeer = inboxes.filter((friend) => {
                return (inbox.user.id === friend.author.id && inbox.author.id === friend.user.id);
            });
            if (findThePeer.length !== 0) {
                if (findThePeer[0].user.id !== user.id) { // the inbox that was found contains the user !== the user that sent the request
                    const checkId = `${user.id}${findThePeer[0].user.id}`;
                    const reverseCheckId = `${findThePeer[0].user.id}${user.id}`;
                    if (userSet.has(checkId) || userSet.has(reverseCheckId))
                        return;
                    const userId: string = `${user.id}${findThePeer[0].user.id}`;
                    userSet.add(userId);
                } else {
                    const checkId = `${user.id}${findThePeer[0].author.id}`;
                    const reverseCheckId = `${findThePeer[0].author.id}${user.id}`;
                    if (userSet.has(checkId) || userSet.has(reverseCheckId))
                        return;
                    const userId: string = `${user.id}${findThePeer[0].author.id}`;
                    userSet.add(userId);
                }
                const latestTimeObj = findThePeer[0].CreatedAt > inbox.CreatedAt ? findThePeer[0] : inbox;
                if(inbox.author.id === user.id)
                    result = this.storeResult(findThePeer[0].author, latestTimeObj.lastMessage, findThePeer[0].unseenMessages, latestTimeObj.CreatedAt);
                else
                   result = this.storeResult(inbox.author, latestTimeObj.lastMessage, inbox.unseenMessages, latestTimeObj.CreatedAt);
                arrayOfInbox.push(result);
            } else {
                // console.log('inbox unseen are: ', inbox.unseenMessages);
                console.log('inbox user id: ', inbox.user.id)
                console.log('user id: ', user.id)

                if (inbox.author.id === user.id) {
                    result = {
                        author: inbox.user,
                        lastMessage: inbox.lastMessage,
                        CreatedAt: inbox.CreatedAt,
                        unseenMessages: 0,
                    };
                } else {
                    result = {
                        author: inbox.author,
                        lastMessage: inbox.lastMessage,
                        CreatedAt: inbox.CreatedAt,
                        unseenMessages: inbox.unseenMessages,
                    };
                }
                arrayOfInbox.push(result);
            }

        });
        console.log('ARRAY IS: ');
        console.log(arrayOfInbox);
        // let inb = await this.inboxService.getAllInboxOfUser(user.id)

        // console.log(inb);
        // return inb
        return arrayOfInbox
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