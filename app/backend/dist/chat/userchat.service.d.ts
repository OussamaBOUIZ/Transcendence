import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { User } from "../databases/user.entity";
import { Repository } from "typeorm";
import { MessageDto, sentMsg } from "../interfaces/interfaces";
import { User_chat } from "../databases/userchat.entity";
import { Message } from "../databases/message.entity";
import { Socket } from "socket.io";
import { InboxService } from "../inbox/inbox.service";
import { UserService } from "../user/user.service";
export declare class ChatGatewayService {
    private readonly jwt;
    private readonly configService;
    private readonly inboxService;
    private readonly userService;
    private userRepository;
    private chatRepository;
    private messageRepository;
    private logger;
    constructor(jwt: JwtService, configService: ConfigService, inboxService: InboxService, userService: UserService, userRepository: Repository<User>, chatRepository: Repository<User_chat>, messageRepository: Repository<Message>);
    getUserFromJwt(authorization: string): any;
    getUserByEmail(email: string): Promise<User>;
    getUserById(Id: number): Promise<User>;
    saveMessage(dto: MessageDto, reciever: User, author: User): Promise<void>;
    isReceiverInBlocked(userId: number, receiverId: number): Promise<boolean>;
    processMessage(socket: Socket, messageDto: MessageDto): Promise<sentMsg>;
    getAllMessages(senderId: number, receiverId: number): Promise<User_chat[] | undefined>;
    loadMessage(user: User, receiver: number): Promise<{
        authorId: number;
        message: string;
        creaionTime: Date;
    }[]>;
}
