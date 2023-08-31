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
import { log } from "console";

@WebSocketGateway(4343, {cors: {
	origin: "http://localhost:5173",
	credentials: true
}})
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server;

    afterInit(server: any) {
        console.log('after init');
    }

    handleConnection(@ConnectedSocket() socket: Socket, ...args: any[]) {
        console.log('handle connect');
    }

    handleDisconnect(@ConnectedSocket() socket: Socket) {
        console.log('handle disconnect');
    }

	@SubscribeMessage('joinGame')
	onJoinGame(@MessageBody() roomKey: string, @ConnectedSocket() socket: Socket) {
		console.log('join game');
		
		socket.join(roomKey);

		console.log(this.server.sockets.adapter.rooms.get(roomKey).size);

		if (this.server.sockets.adapter.rooms.get(roomKey).size == 2) {
			socket.emit("notHost")
		}
	}

	@SubscribeMessage('gameEnd')
	onGameEnd(@MessageBody() roomKey: string, @ConnectedSocket() socket: Socket) {
		console.log('leave game');
		
		socket.leave(roomKey);
	}

    @SubscribeMessage('game')
	onNewMessage(@MessageBody() body: any, @ConnectedSocket() socket: Socket) {
		socket.to(body.gameKey).emit("movePad", body);
	}
}
