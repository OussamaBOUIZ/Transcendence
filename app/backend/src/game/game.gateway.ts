import {
	ConnectedSocket,
    MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway, 
	WebSocketServer,
	WsException,
	
} from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { Game } from 'src/databases/game.entity';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { brotliDecompressSync } from "zlib";


@WebSocketGateway(4343, {cors: {
	origin: "http://localhost:5173",
	credentials: true
}})
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server;

    afterInit(server: any) {
        console.log('after init');
    }
    handleConnection(client: any, ...args: any[]) {
        console.log('handle connection');
    }
    handleDisconnect(client: any) {
        console.log('handle disconnect');
    }
    
    // constructor(
	// 	@InjectRepository(Game) private gameRepository: Repository<Game>,
	// 	// private chatGatewayService: ChatGatewayService,
	// 	// private inboxService: InboxService,
	// 	// private userService: UserService,
	// 	// // private readonly jwt: JwtService,
	// 	// private readonly configService: ConfigService
	// ) {}

    @SubscribeMessage('game')
	onNewMessage(@MessageBody() body: any, @ConnectedSocket() socket: Socket) {
		console.log(body)
        socket.broadcast.emit("movePad", body);
	}
}
