import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Inbox_user} from "./inbox_user.entity";
import {Repository} from "typeorm";
import {User} from "../user.entity";

@Injectable()
export class InboxRepositoryService {
    constructor(@InjectRepository(Inbox_user) private inboxRepository: Repository<Inbox_user>)
    {
    }
    async getInboxBySenderId(senderId: number, user: User) : Promise<Inbox_user | undefined> {
        return (await  this.inboxRepository.findOneBy({
            sender_id: senderId
        }))
    }
}
