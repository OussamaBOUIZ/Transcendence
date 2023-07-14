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

@Injectable()
export class ChatGatewayService {

	constructor(
		private readonly jwt: JwtService,
		private readonly configService: ConfigService,
		@InjectRepository(User) private userRepository: Repository<User>,
		@InjectRepository(User_chat) private chatRepository: Repository<User_chat>,
		@InjectRepository(Message) private messageRepository: Repository<Message>,
		@InjectRepository(Inbox_user) private inboxRepository: Repository<Inbox_user>,
	) {
	}

	private logger = new Logger(ChatGatewayService.name)

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
		const user = await this.userRepository.findOneBy({email: email})
		return user
	}

	async getUserById(Id: number) {
		return await this.userRepository.findOneBy({id: Id})
	}

	// async getMessages(user: User) {
	//
	// }

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


	async getInboxBySenderId(senderId: number, user: User) : Promise<Inbox_user | undefined> {
		return (await  this.inboxRepository.findOneBy({
			sender_id: senderId
		}))
	}
	async saveInbox(user: User, senderId: number, msgDto: MessageDto) {

		 let inbox : Inbox_user
		inbox = await this.getInboxBySenderId(senderId, user)
		console.log('inbox type', inbox)
		console.log('msgDto type', msgDto.user.userId)
		if(inbox === null) {
			inbox = new Inbox_user()
			inbox.sender_id = senderId; // id of the receiver
			inbox.lastMessage = msgDto.message;
			inbox.CreatedAt = msgDto.timeSent
			inbox.unseenMessages = 0
			inbox.user = user;
		}
		else {
			inbox.lastMessage = msgDto.message
			inbox.CreatedAt = msgDto.timeSent
			if (inbox.unseenMessages != 0)
				inbox.unseenMessages += 1;
		}
		await this.inboxRepository.save(inbox)
	}

	async loadMessage(user: User, sender: number) {
		const receiverMsgs = await  this.getAllMessages(user.id)
		const sendMsgs = await this.getAllMessages(sender)

		this.logger.log(sendMsgs)
		this.logger.log(receiverMsgs)
	}

	async getAllMessages(id: number): Promise<User_chat[] | undefined> {
		return await this.chatRepository.find({
			relations: {
				messages: true
			},
			where : {
				sender_id: id
			},
			take: 30
		})
	}


}
