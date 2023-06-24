import {
	MessageBody, OnGatewayConnection, OnGatewayDisconnect,
	OnGatewayInit, SubscribeMessage,
	WebSocketGateway, WebSocketServer, WsException
} from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { ChatGatewayService } from "./userchat.service";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import { User } from 'src/databases/user.entity';
import {WsGuard} from "../../auth/socketGuard/wsGuard";
import {UseGuards} from "@nestjs/common";

/**
 * RxJS :
 *
 * ? Observable - An object responsible for handling data streams and notifying
        observers when new data arrives
 * Observer: consumers of data streams emitted by observables,
 *
 *
 */
@WebSocketGateway()
@UseGuards(WsGuard)
export class chatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	constructor (
		@InjectRepository (User) private userRepository: Repository<User>,
		private chatGatewayService: ChatGatewayService,
		private readonly jwt: JwtService,
		private readonly configService: ConfigService
	) {
	}

	@WebSocketServer()
	server: Server;

	@SubscribeMessage('message')
	SendMessage(socket: Socket, data: any) {
		const { message, userR} = data
		console.log(userR)
		console.log(message)
		console.log(socket.id)
		let token = socket.handshake?.headers?.authorization.split(' ')[1]
		let decodedToken = this.jwt.verify(token, {
			secret: this.configService.get('JWT_SECRET') })
		console.log(decodedToken)
	}

	afterInit(server: any) {
		console.log('after init called')
	}


	async handleConnection(client: Socket) {
		// console.log(`hello welcome you are connected to socket ${client.id}`)
		// let token: string;
		//
		// token = client.handshake?.headers?.authorization.split(' ')[1];
		//
		// try {
		// 	const decodedToken =  this.jwt.verify(token, {
		// 		secret: this.configService.get('JWT_SECRET')
		// 	})
		// 	console.log(decodedToken.id)
		// 	let user = await this.userRepository.findOneBy({id: decodedToken.id})
		// 	user.socketId = client.id;
		// 	await this.userRepository.save(user)
		// 	console.log(user)
		// }
		// catch (e) {
		// 	console.log(`not authorized\n`)
		// 	throw new WsException(e.message);
		// }
	}


	handleDisconnect(client: any) {
		console.log('disconnected')
	}
}

