import {Injectable} from '@nestjs/common';
import {User} from "../databases/user.entity";
import {MoreThan, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Inbox_user} from "../databases/inbox_user.entity";
import {MessageDto} from "../interfaces/interfaces";

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

        if (!inbox) {
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
        if (receiver.isActive !== true)
            inbox.unseenMessages += 1
        await this.inboxRepository.save(inbox)
    }

    async getInboxBySenderId(author: User, receiver: User): Promise<Inbox_user> {
        return await this.inboxRepository.findOne({
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
        });
    }

    async getAllInboxOfUser(authorId: number) {

        return await this.inboxRepository.find({
            relations: {
                user: true,
                author: true
            },
            where: [
                { author: { id: authorId } },
                { user: {id: authorId } },
            ],
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

    async updateInbox(inbox: Inbox_user)
    {
        await this.inboxRepository.save(inbox) // todo : if failed to save the inbox ??
    }


    // async getUserPeers(user: User) {
    //     await this.inboxRepository.find({
    //         where: [
    //             { author: { id: user.id } },
    //             { user: {id: user.id } },
    //         ],
    //     })
    // }
    //
    // async listFriends() {
    //
    // }
}
