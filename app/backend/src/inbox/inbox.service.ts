import { Injectable } from '@nestjs/common';
import {User} from "../databases/user.entity";
import {MoreThan, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Inbox_user} from "../databases/inbox_user.entity";
import {MessageDto} from "../interfaces/interfaces";
import {Status} from "../interfaces/enums";

@Injectable()
export class InboxService {
    constructor(@InjectRepository(Inbox_user) private inboxRepository: Repository<Inbox_user>) {
    }
    async getUserInboxByunseenMessage(user: User) {
        return await this.inboxRepository.findAndCount({
            relations: {user: true},
            select: ["unseenMessages"],
            where: {
                user: {id: user.id},
                unseenMessages: MoreThan(0),
            }
        })
    }
    async saveInbox(receiver: User, author: User, msgDto: MessageDto) {
        let inbox: Inbox_user
        inbox = await this.getInboxBySenderId(author, receiver)
        console.log(inbox);
        
        if (!inbox) {
            console.log('new inbox');
            
            inbox = new Inbox_user()
            inbox.author = author; // id of the receiver
            inbox.lastMessage = msgDto.message;
            inbox.CreatedAt = msgDto.creationTime
            inbox.user = receiver;
            inbox.unseenMessages = 0
        } else {
            inbox.lastMessage = msgDto.message
            inbox.CreatedAt = msgDto.creationTime
        }
        // I assume that the receiver is on chat page
        if (receiver.isActive === true)
            inbox.unseenMessages = 0
        else
            inbox.unseenMessages += 1
        console.log(inbox);
        
        await this.inboxRepository.save(inbox)
    }

    async getInboxBySenderId(author: User, receiver: User): Promise<Inbox_user> {
        const tmp = await this.inboxRepository.findOne({
            relations: {
                user: true,
                author: true
            },
            where: {
                author: {
                    id: author.id
                },
                user: {
                    id: receiver.id
                }
            }
        })

        return tmp;
    }

    async getAllInboxOfUser(authorId: number) {
        return await this.inboxRepository.find({
            relations: {
                user: true,
                author: true
            },
            where: {
                 author: {
                    id: authorId
                 },
            },
            order: {
                CreatedAt: 'DESC'
            },
            select: {
                user: {
                    id: true,
                    username: true,
                },
                author: {
                    id: true,
                    username: true,
                }
            }
        })
    }
}
