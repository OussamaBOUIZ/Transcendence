import {Injectable, Logger} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../databases/user.entity";
import {Repository} from "typeorm";
import {MessageDto} from "../interfaces/interfaces";
import {User_chat} from "../databases/userchat.entity";
import {Message} from "../databases/message.entity";


@Injectable()
export class ChatGatewayService {

	constructor(
		private readonly jwt: JwtService,
		private readonly configService: ConfigService,
		@InjectRepository(User) private userRepository: Repository<User>,
		@InjectRepository(User_chat) private chatRepository: Repository<User_chat>,
		@InjectRepository(Message) private messageRepository: Repository<Message>,
	) {
	}

	private logger = new Logger(ChatGatewayService.name)


	isValidAuthHeader(authorization: string) {
		const token: string = authorization.split(' ')[1];
		return this.jwt.verify(token, {
			secret: this.configService.get('JWT_SECRET')
		});
	}

	getUser(authorization: string) {
		const token: string = authorization.split(' ')[1];
		return this.jwt.verify(token, {
			secret: this.configService.get('JWT_SECRET')
		});
	}

	async getUserById(Id: number) {
		return await this.userRepository.findOneBy({id: Id})
	}

	async getMessages(user: User) {

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
}