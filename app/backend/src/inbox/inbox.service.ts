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
    async getUserInboxByUnseenMessage(user: User) {
        return await this.inboxRepository.findAndCount({
            relations: {user: true},
            select: ["unseenMessages"],
            where: {
                user: {id: user.id},
                unseenMessages: MoreThan(0),
            }
        })
    }
    async saveInbox(receiver: User, senderId: number, msgDto: MessageDto) {
        let inbox: Inbox_user
        console.log(receiver)
        inbox = await this.getInboxBySenderId(senderId, receiver)
        console.log('inbox:', inbox)
        console.log('senderId: ', senderId)
        if (inbox === undefined || inbox === null) {
            inbox = new Inbox_user()
            inbox.sender_id = senderId; // id of the receiver
            inbox.lastMessage = msgDto.message;
            inbox.CreatedAt = msgDto.creationTime
            inbox.user = receiver;
        } else {
            inbox.lastMessage = msgDto.message
            inbox.CreatedAt = msgDto.creationTime
        }
        // I assume that the receiver is on chat page
        if (receiver.status != Status.Online)
            inbox.unseenMessages = 1
        else
            inbox.unseenMessages += 1
        await this.inboxRepository.save(inbox)
    }

    async getInboxBySenderId(senderid: number, receiver: User): Promise<Inbox_user> {
        const tmp = await this.inboxRepository.findOne({
            relations: {
                user: true
            },
            where: {
                sender_id: senderid,
                user: {
                    id: receiver.id
                }
            }
        })

        console.log(tmp)

        return tmp;
        /*  const author = await this.userRepository.findOne({
			  relations: {
				  inbox_users: true
			  },
			  where: {
				  id: receiver.id,
				  inbox_users: {
					 sender_id: senderid
				  }
			  },
  `
		  })
		  console.log(author.inbox_users)
		  return author.inbox_users*/
    }
}
