import {
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer
} from "@nestjs/websockets";
import {Server, Socket} from 'socket.io';
import {ChatGatewayService} from "./userchat.service"
import {ConfigService} from "@nestjs/config";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from 'src/databases/user.entity';
import {WsGuard} from "../auth/socketGuard/wsGuard";
import {Logger, UseGuards} from '@nestjs/common';
import {SocketAuthMiddleware} from "./websocket.middleware";
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

	// @SubscribeMessage('message')
	// async loadMessages(socket: Socket, data: { Receiver: ReceiverDto }) {
	//     let user = await this.chatGatewayService.getUserById(data.Receiver.userId)
	//     if (!user)
	//         this.logger.log('todo handle if not exist!!')
	//
	// }

	@SubscribeMessage('SendMessage')
	async sendMessage(socket: Socket, messageDto: MessageDto) {
		const socketId = await this.chatGatewayService.processMessage(socket, messageDto)
		this.server.to(socketId).emit("message", messageDto.message)
	}

	@SubscribeMessage('loadMessages')
	async allMessages(socket: Socket, data: MessageDto) {
		const receiver = await this.chatGatewayService.getUserById(data.user.userId)
		if (typeof receiver === undefined)
			console.log('todo: handle if the receiver not exist')

		const db_user = await this.userRepository.findOneBy({email: socket.data.user.email})
		if (typeof db_user === undefined)
			console.log('todo: handle if the receiver not exist')
		return await this.chatGatewayService.loadMessage(db_user, receiver.id)
	}

	afterInit(client: Socket) {
		client.use(SocketAuthMiddleware(this.chatGatewayService) as any)
		console.log('after init called')
	}

	async handleConnection(client: Socket) {
		this.logger.log('On Connection')
		const {authorization} = client.handshake.headers;
		let user: User
		const userFromJwt = this.chatGatewayService.getUserFromJwt(authorization)
		user = await this.userRepository.findOneBy({email: userFromJwt.email})
		if (user) {
			user.socketId = client.id
		} else {
			user = new User()
			user.email = userFromJwt.email
			user.socketId = client.id;
		}
		user.status = 'Online'
		await this.userRepository.save(user)
	}


	async handleDisconnect(client: Socket) {
		const jwtUser = this.chatGatewayService.getUserFromJwt(client.handshake.headers.authorization)
		console.log(jwtUser)
		const user = await this.chatGatewayService.getUserByEmail(jwtUser.email)
		if (user == null)
			this.logger.log('user not exist in DB : handle disconnect')
		user.status = 'Offline'
		await this.userRepository.save(user)
		this.logger.log('On Disconnect')
	}
}

