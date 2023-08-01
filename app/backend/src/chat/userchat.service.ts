import {Injectable, Logger} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../databases/user.entity";
import {Repository} from "typeorm";
import {MessageDto} from "../interfaces/interfaces";
import {User_chat} from "../databases/userchat.entity";
import {Message} from "../databases/message.entity";
import {Socket} from "socket.io";
import {InboxService} from "../inbox/inbox.service";
import {use} from "passport";

@Injectable()
export class ChatGatewayService {
    private logger = new Logger(ChatGatewayService.name)

    constructor(
        private readonly jwt: JwtService,
        private readonly configService: ConfigService,
        private readonly inboxService: InboxService,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(User_chat) private chatRepository: Repository<User_chat>,
        @InjectRepository(Message) private messageRepository: Repository<Message>,
        // @InjectRepository(Inbox_user) private inboxRepository: Repository<Inbox_user>,
    ) {
    }

    // isValidAuthHeader(authorization: string) {
    //     const token: string = authorization.split(' ')[1];
    //     return this.jwt.verify(token, {
    //         secret: this.configService.get('JWT_SECRET')
    //     });
    // }

    getUserFromJwt(authorization: string) {
        const token: string = authorization.split(' ')[1];
        return this.jwt.verify(token, {
            secret: this.configService.get('JWT_SECRET')
        });
    }

    async getUserByEmail(email: string) {
        return await this.userRepository.findOneBy({email: email})
    }

    async getUserById(Id: number) {
        return await this.userRepository.findOneBy({id: Id})
    }

    async saveMessage(dto: MessageDto, user: User, sender: number) {
        const user_chat = new User_chat()
        const msg = new Message()

        user_chat.sender_id = sender
        user_chat.user = user

        await this.chatRepository.save(user_chat)

        msg.message = dto.message
        msg.CreatedAt = dto.timeSent
        msg.user_chat = user_chat
        await this.messageRepository.save(msg)
    }

    async processMessage(socket: Socket, messageDto: MessageDto) {
        const receiver = await this.getUserById(messageDto.user.userId)
        if (receiver === null)
            console.log('TODO : handle if the receiver not exist')
        this.logger.log({receiver})
        this.logger.log(socket.data.user.email)
        // find the sender by email

        this.logger.log(socket.data.user.email)
        const author = await this.userRepository.findOneBy({email: socket.data.user.email})
        if (author === null)
            return 'todo handle not authorized'
        await this.saveMessage(messageDto, receiver, author.id)
        // check status of receiver
        if (receiver.isActive === false)
            // save the last message in inbox table
            await this.inboxService.saveInbox(receiver, author.id, messageDto)
        return receiver.socketId
    }

    async getAllMessages(senderId: number, userId: number): Promise<User_chat[] | undefined> {
        return await this.chatRepository.find({
            select: {messages: true},
            relations: {
                messages: true,
                user: true
            },
            where: {
                sender_id: senderId,
                user: {id: userId}
            },
            take: 30
        })
    }

    async loadMessage(user: User, sender: number) {
        const receiverMsgs = await this.getAllMessages(user.id, sender)
        const senderMsgs = await this.getAllMessages(sender, user.id)
        return {receiverMsgs, senderMsgs}
    }


}
