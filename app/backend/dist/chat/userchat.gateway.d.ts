import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { ChatGatewayService } from "./userchat.service";
import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";
import { User } from 'src/databases/user.entity';
import { MessageDto } from "../interfaces/interfaces";
import { InboxService } from "../inbox/inbox.service";
import { UserService } from "../user/user.service";
export declare class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private userRepository;
    private chatGatewayService;
    private inboxService;
    private userService;
    private readonly configService;
    server: Server;
    private readonly logger;
    constructor(userRepository: Repository<User>, chatGatewayService: ChatGatewayService, inboxService: InboxService, userService: UserService, configService: ConfigService);
    sendMessage(socket: Socket, messageDto: MessageDto): Promise<void>;
    updateUnseenMessage(socket: Socket, peerDto: any): Promise<void>;
    resetUnseenMessage(socket: Socket, peerDto: number): Promise<void>;
    onUpdateInbox(socket: Socket, payload: number): Promise<void>;
    afterInit(client: Socket): Promise<void>;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
}
