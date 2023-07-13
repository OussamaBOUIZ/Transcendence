import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import {Server, Socket} from 'socket.io';
import {ChatGatewayService} from "./userchat.service";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from 'src/databases/user.entity';
import {WsGuard} from "../auth/socketGuard/wsGuard";
import {Logger, UseGuards} from '@nestjs/common';
import {SocketAuthMiddleware} from "./ws.mw";
import {MessageDto, ReceiverDto} from "../interfaces/interfaces";
import {json} from "stream/consumers";

/**
 * RxJS :
 *
 * ? Observable - An object responsible for handling data streams and notifying
 observers when new data arrives
 * Observer: consumers of data streams emitted by observables,
 *
 *
 */
/**
 * todo :
 *        - handle if token is not empty and is in valid way : token = `bearer (token)`
 *        -
 *
 */

@WebSocketGateway()
@UseGuards(WsGuard)
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private readonly logger: Logger;

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private chatGatewayService: ChatGatewayService,
        // private readonly jwt: JwtService,
        private readonly configService: ConfigService
    ) {
        this.logger = new Logger(ChatGateway.name);
    }

    @SubscribeMessage('message')
    async loadMessages(socket: Socket, data: { Receiver: ReceiverDto }) {
        let user = await this.chatGatewayService.getUserById(data.Receiver.userId)
        if (!user)
            this.logger.log('todo handle if not exist!!')

    }

    @SubscribeMessage('SendMessage')
    async sendMessage(socket: Socket, data: MessageDto) {
        let receiver = await this.chatGatewayService.getUserById(data.user.userId)
        if (!receiver)
            console.log('TODO : handle if the receiver not exist')
        this.logger.log({receiver})
        this.logger.log({sender: socket.data.user})
        console.log(socket.data.user.id)
        await this.chatGatewayService.saveMessage(data, receiver, socket.data.user.id)
        this.server.to(receiver.socketId).emit("message", data.message)
    }


    afterInit(client: Socket) {
        client.use(SocketAuthMiddleware(this.chatGatewayService) as any)
        console.log('after init called')
    }

    async handleConnection(client: Socket) {
        const {authorization} = client.handshake.headers;

        const user = this.chatGatewayService.getUser(authorization)
        user.socketId = client.id
        await this.userRepository.save(user)
    }


    handleDisconnect(client: any) {
        console.log('disconnected')
    }
}

