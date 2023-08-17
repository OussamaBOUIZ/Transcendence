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
import {InboxService} from "../inbox/inbox.service";
import {UserService} from "../user/user.service";   

/**
 * RxJS :
 *
 * ? Observable - An object responsible for handling data streams and notifying
 observers when new data arrives
 * Observer: consumers of data streams emitted by observables,
 *
 */
/**
 * todo :
 *        - handle if token is not empty and is in valid way : token = `bearer (token)`
 *        -
 *
 */

 @WebSocketGateway(4000, {cors: {
	origin: "http://localhost:5173",
		credentials: true
}})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server;
	private readonly logger: Logger;

	constructor(
		@InjectRepository(User) private userRepository: Repository<User>,
		private chatGatewayService: ChatGatewayService,
		private inboxService: InboxService,
		private userService: UserService,
		// private readonly jwt: JwtService,
		private readonly configService: ConfigService
	) {
		this.logger = new Logger(ChatGateway.name);
	}
	
	@SubscribeMessage('SendMessage')
	async sendMessage(socket: Socket, messageDto: MessageDto) {
		console.log('onSendMessage')
		console.log(messageDto)
		let socketId: string
		try {
			socketId = await this.chatGatewayService.processMessage(socket, messageDto)
		}
		catch (e) {
			console.log(e)
			this.server.to(e.socket).emit('error', e.msg)
			return
		}
		console.log(socketId, messageDto.message);
		
		this.server.to(socketId).emit("message", messageDto.message)
	}
 
	// @SubscribeMessage('loadMessages')
	// async allMessages(socket: Socket, data: MessageDto) {
	// 	const receiver = await this.chatGatewayService.getUserById(data.user.userId)
	// 	if (receiver === null)
	// 		console.log('todo: handle if the receiver not exist')
	//
	// 	const db_user = await this.userRepository.findOneBy({email: socket.data.user.email})
	// 	if (db_user === null)
	// 		console.log('todo: handle if the receiver not exist')
	// 	return await this.chatGatewayService.loadMessage(db_user, receiver.id)
	// }

	async afterInit(client: Socket) {
		await client.use(SocketAuthMiddleware(this.userService) as any)
		console.log('after init called')
	}

	async handleConnection(client: Socket) {
		this.logger.log('On Connection')
		this.logger.log(client.data.user.email)
		let user: User
		user = await this.userRepository.findOneBy({email: client.data.user.email})
		const inbox = await  this.inboxService.getUserInboxByUnseenMessage(user)
		if (inbox[1] > 0)
			console.log('emit client side (User has unseen Messages)')
		if (!user)
			console.log('no such user or deleted');
		user.socketId = client.id
		user.isActive = true
		await this.userRepository.save(user)
	}


	async handleDisconnect(client: Socket) {
		const user = await this.chatGatewayService.getUserByEmail(client.data.user.email)
		if (user == null)
			this.logger.log('user not exist in DB : handle disconnect')

		user.isActive = false
		await this.userRepository.save(user)
		this.logger.log('On Disconnect')
	}
}

