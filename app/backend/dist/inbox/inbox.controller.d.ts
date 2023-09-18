import { ChatGatewayService } from 'src/chat/userchat.service';
import { User } from 'src/databases/user.entity';
import { Repository } from 'typeorm';
import { UserService } from "../user/user.service";
import { InboxService } from "./inbox.service";
import { Request } from 'express';
type InboxItem = {
    author: {
        id: number;
        username: string;
    };
    lastMessage: string;
    unseenMessages?: number;
    CreatedAt: Date;
};
export declare class InboxController {
    private readonly chatService;
    private readonly userService;
    private readonly inboxService;
    private userRepository;
    constructor(chatService: ChatGatewayService, userService: UserService, inboxService: InboxService, userRepository: Repository<User>);
    storeResult(author: User, lastMessage: string, unseenMessages: number, CreatedAt: Date): InboxItem;
    getUserInbox(req: Request): Promise<"Not authorized" | InboxItem[]>;
}
export {};
