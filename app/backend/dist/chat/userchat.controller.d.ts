import { ChatGatewayService } from "./userchat.service";
import { UserService } from "../user/user.service";
import { Request } from 'express';
export declare class chatController {
    private chatService;
    private userRepository;
    constructor(chatService: ChatGatewayService, userRepository: UserService);
    getMessages(req: Request, id: number): Promise<{
        authorId: number;
        message: string;
        creaionTime: Date;
    }[]>;
}
