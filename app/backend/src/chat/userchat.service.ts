import {Injectable, Logger} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../databases/user.entity";
import {Repository} from "typeorm";
import {MessageDto} from "../interfaces/interfaces";
import {User_chat} from "../databases/userchat.entity";
import {Message} from "../databases/message.entity";
import {Inbox_user} from "../databases/inbox_user.entity";
import {Status} from "../interfaces/enums";
import {Socket} from "socket.io";

@Injectable()
export class ChatGatewayService {

    0
    private logger = new Logger(ChatGatewayService.name)

    constructor(
        private readonly jwt: JwtService,
        private readonly configService: ConfigService,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(User_chat) private chatRepository: Repository<User_chat>,
        @InjectRepository(Message) private messageRepository: Repository<Message>,
        @InjectRepository(Inbox_user) private inboxRepository: Repository<Inbox_user>,
    ) {
    }

    isValidAuthHeader(authorization: string) {
        const token: string = authorization.split(' ')[1];
        return this.jwt.verify(token, {
            secret: this.configService.get('JWT_SECRET')
        });
    }

    getUserFromJwt(authorization: string) {
        const token: string = authorization.split(' ')[1];
        return this.jwt.verify(token, {
            secret: this.configService.get('JWT_SECRET')
        });
    }

    async getUserByEmail(email: string) {
        return await this.userRepository.findOneBy({email: email})
    }

    // async getMessages(user: User) {
    //
    // }

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
        // save the last message in inbox table
        await this.saveInbox(receiver, author.id, messageDto)
        return receiver.socketId
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
            inbox.CreatedAt = msgDto.timeSent
            inbox.user = receiver;
        } else {
            inbox.lastMessage = msgDto.message
            inbox.CreatedAt = msgDto.timeSent
        }
        // I assume that the receiver is on chat page
        if (receiver.status != Status.Online)
            inbox.unseenMessages = 0
        else
            inbox.unseenMessages += 1
        await this.inboxRepository.save(inbox)
    }


    async getAllMessages(id: number): Promise<User_chat[] | undefined> {
        return await this.chatRepository.find({
            relations: {
                messages: true
            },
            where: {
                sender_id: id
            },
            take: 30
        })
    }

    async loadMessage(user: User, sender: number) {
        const receiverMsgs = await this.getAllMessages(user.id)
        const sendMsgs = await this.getAllMessages(sender)

        this.logger.log(sendMsgs)
        this.logger.log(receiverMsgs)
    }


}
