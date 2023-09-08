import {
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway, 
	WebSocketServer,
	WsException
} from "@nestjs/websockets";
import {Server, Socket} from 'socket.io';
import {ChatGatewayService} from "./userchat.service"
import {ConfigService} from "@nestjs/config";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from 'src/databases/user.entity';
import {WsGuard} from "../auth/socketGuard/wsGuard";
import {Logger, UseFilters, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {SocketAuthMiddleware} from "./websocket.middleware";
import {MessageDto, sentMsg} from "../interfaces/interfaces";
import {InboxService} from "../inbox/inbox.service";
import {UserService} from "../user/user.service";   
import {MessageData} from "../interfaces/interfaces"
import { WsExceptionFilter } from "src/Filter/ws.filter";
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

@UseFilters(WsExceptionFilter)
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
	
	@UsePipes(new ValidationPipe({ 
		transform: true,
	}))
	@SubscribeMessage('SendMessage')
	async sendMessage(socket: Socket, messageDto: MessageDto) {
		var data: sentMsg
		try {
			data = await this.chatGatewayService.processMessage(socket, messageDto)
			// const message: MessageData = {
			// 	authorId: data.authorId,
			// 	username: data.username,
			// 	message: messageDto.message,
			// 	creationTime: new Date(messageDto?.creationTime),
			// }
			this.server.to(data.socketId).emit("message", messageDto)
			
		}
		catch (e) {
			this.server.to(e.socket).emit('error', e.msg)
			return
		}
		
	}

	@SubscribeMessage('updateUnseenMessage')
	async updateUnseenMessage(socket: Socket, peerDto) {
		const userEmail = socket.data.user.email

		const user = await this.userService.findUserByEmail(userEmail);
		const peer = await this.userService.findUserById(peerDto)

		if (!user || !peer)
		{
			const message = !user ? 'The user not exist' : 'The Peer not exist'
			throw new WsException(message)
		}

		const inbox = await  this.inboxService.getInboxBySenderId(peer, user);
		this.logger.log({inbox})
		if (!inbox)
			throw new WsException('there is no prior conversation !')
		inbox.unseenMessages += 1
		this.logger.log('here in update', inbox.unseenMessages)
		
		await this.inboxService.updateInbox(inbox)
	}

	@SubscribeMessage('messageSeen')
	async  resetUnseenMessage(socket: Socket, peerDto: number) {
		const userEmail = socket.data.user.email

		const user = await this.userService.findUserByEmail(userEmail);
		const peer = await this.userService.findUserById(peerDto)

		if (!user || !peer)
		{
			const message = !user ? 'The user not exist' : 'The Peer not exist'
			throw new WsException(message)
		}

		 const inbox = await  this.inboxService.getInboxBySenderId(peer, user);
		if (!inbox)
			throw new WsException('there is no prior conversation !')
		inbox.unseenMessages = 0
		await this.inboxService.updateInbox(inbox)
	}
 
	@SubscribeMessage('updateInbox')
	async onUpdateInbox(socket: Socket, payload: number) {

		// the author is the payload the receiver is who is connected to socket 
		const author = await this.userService.findUserById(payload)
		const receiver = socket.data.user.email;

		// check if Two users are in database otherwise emit error
		
		const inbox = await this.inboxService.getInboxBySenderId(author, receiver)
		this.server.to(socket.id).emit('updateInbox', inbox)
	}


	async afterInit(client: Socket) {
		client.use(SocketAuthMiddleware(this.userService) as any)
	}  

	async handleConnection(client: Socket) {
		let user: User
		user = await this.userRepository.findOneBy({email: client.data.user.email})
		if (!user)
		throw new WsException("the user not found")
		user.socketId = client.id
		user.isActive = true
		await this.userRepository.save(user)
	}


	async handleDisconnect(client: Socket) {
		const user = await this.chatGatewayService.getUserByEmail(client.data.user.email)
		if (!user)
			throw new WsException("the user not found")

		user.isActive = false
		await this.userRepository.save(user)
	}
}

