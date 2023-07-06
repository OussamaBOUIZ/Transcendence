import {Injectable, Logger} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../databases/user.entity";
import {Repository} from "typeorm";
import {MessageDto} from "../interfaces/interfaces";
import {User_chat} from "../databases/userchat.entity";


@Injectable()
export class ChatGatewayService {

	constructor(
		private readonly jwt: JwtService,
		private readonly configService: ConfigService,
		@InjectRepository(User) private userRepository: Repository<User>,
		@InjectRepository(User_chat) private chatRepository: Repository<User_chat>,
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
	async saveMessage(message: string, user: User) {

	}
}