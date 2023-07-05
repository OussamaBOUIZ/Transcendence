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
import {MessageDto} from "../interfaces/interfaces";

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
export class chatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	private readonly logger: Logger;

	constructor(
		@InjectRepository(User) private userRepository: Repository<User>,
		private chatGatewayService: ChatGatewayService,
		private readonly jwt: JwtService,
		private readonly configService: ConfigService
	) {
		this.logger = new Logger('chatGateway');
	}

	@WebSocketServer() server: Server;


	@SubscribeMessage('message')
	async SendMessage(socket: Socket, data: { Message: MessageDto }) {
		let user = await this.chatGatewayService.getUserById(data.Message.user.userId)
		if (!user)
			this.logger.log('todo handle if not exist!!')


	}

	afterInit(client: Socket) {
		client.use(SocketAuthMiddleware(this.chatGatewayService) as any)
		console.log('after init called')
	}


	async handleConnection(client: Socket) {
		const {authorization} = client.handshake.headers;

		const user = this.chatGatewayService.getUser(authorization)
		user.socketId = client.id
		client.data.client = user;
		await this.userRepository.save(user)
	}


	handleDisconnect(client: any) {
		console.log('disconnected')
	}
}

