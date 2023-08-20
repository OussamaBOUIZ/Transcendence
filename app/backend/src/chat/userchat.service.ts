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
import {UserService} from "../user/user.service";

@Injectable()
export class ChatGatewayService {
    private logger = new Logger(ChatGatewayService.name)

    constructor(
        private readonly jwt: JwtService,
        private readonly configService: ConfigService,
        private readonly inboxService: InboxService,
        private readonly userService: UserService,
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

    async saveMessage(dto: MessageDto, reciever: User, author: User) {
        const user_chat = new User_chat()
        const msg = new Message()

        user_chat.receiverId = reciever.id
        user_chat.author = author

        await this.chatRepository.save(user_chat)

        msg.message = dto.message
        msg.CreatedAt = dto.creationTime
        msg.user_chat = user_chat
        await this.messageRepository.save(msg)
    }

    async isReceiverInBlocked(userId: number, receiverId: number) : Promise<boolean>
    {
        const blockedUser =  await this.userService.getBlockedUsers(userId)
        let isBlocked: boolean = false
        blockedUser.blocked_users.forEach(
            (value) => {
                if (value.id === receiverId)
                {
                    isBlocked = true
                    return
                }
            }
        )
        return isBlocked
    }
    async processMessage(socket: Socket, messageDto: MessageDto) {
        const receiver = await this.getUserById(messageDto.userId)
        const author = await this.userRepository.findOneBy({email: socket.data.user.email})
        if (!author || !receiver) {
            throw {
                msg: 'Invalid sender or receiver',
                socket: author.socketId
            }
        }
        console.log(author.username, receiver.username)
        if (author.id === receiver.id)
            throw {
                msg: 'You cannot send message to your self?',
                socket: author.socketId
            }
        if (await this.isReceiverInBlocked(author.id, receiver.id) === true || await this.isReceiverInBlocked(receiver.id, author.id) == true)
            throw {
                msg: 'the user blocked',
                socket: author.socketId
            }
        await this.saveMessage(messageDto, receiver, author)
        // check status of receiver
        await this.inboxService.saveInbox(receiver, author, messageDto)
        return {
            authorId: author.id,
           socket: receiver.socketId
        }
    }

    async getAllMessages(senderId: number, receiverId: number): Promise<User_chat[] | undefined> {
        return await this.chatRepository.find({
            select: {
                author: {
                    id: true
                }
            },
            relations: {
                messages: true,
                author: true
            },
            where: [
                {receiverId: senderId, author: {id: receiverId}},
                {receiverId: receiverId, author: {id: senderId}}
            ],
            order: {
                messages:{ 
                    CreatedAt: 'DESC'
                }
            },
            take: 30
        })
    }

    async loadMessage(user: User, receiver: number) {
        const message = await this.getAllMessages(user.id, receiver)
        console.log('message',message)
        const transformedArray = message.map(item => {
            const message = item.messages[0]
            if (!message)
                return []
            return {
                authorId : item.author.id,
                message: message?.message,
                date: new Date(message?.CreatedAt)
            }
        })
        return transformedArray
    }


}
