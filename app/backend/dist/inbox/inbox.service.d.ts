import { User } from "../databases/user.entity";
import { Repository } from "typeorm";
import { Inbox_user } from "../databases/inbox_user.entity";
import { MessageDto } from "../interfaces/interfaces";
export declare class InboxService {
    private inboxRepository;
    constructor(inboxRepository: Repository<Inbox_user>);
    getUserInboxByunseenMessage(user: User): Promise<[Inbox_user[], number]>;
    saveInbox(receiver: User, author: User, msgDto: MessageDto): Promise<void>;
    getInboxBySenderId(author: User, receiver: User): Promise<Inbox_user>;
    getAllInboxOfUser(authorId: number): Promise<Inbox_user[]>;
    updateInbox(inbox: Inbox_user): Promise<void>;
}
